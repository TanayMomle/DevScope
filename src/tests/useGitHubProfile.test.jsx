import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useGitHubProfile } from '../hooks/useGitHubProfile.js';
import { fetchRepositories, fetchUser } from '../services/githubService.js';
import { GitHubError, GitHubErrorType } from '../api/errors.js';

vi.mock('../services/githubService.js', () => ({
  fetchUser: vi.fn(),
  fetchRepositories: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

describe('useGitHubProfile', () => {
  it('is idle and fetches nothing without a username', () => {
    const { result } = renderHook(() => useGitHubProfile(''), { wrapper: createWrapper() });

    expect(result.current.profile.status).toBe('idle');
    expect(result.current.repositories.status).toBe('idle');
    expect(fetchUser).not.toHaveBeenCalled();
  });

  it('loads the profile and repositories on success', async () => {
    fetchUser.mockResolvedValue({ login: 'octocat' });
    fetchRepositories.mockResolvedValue([{ id: 1, name: 'Hello-World' }]);

    const { result } = renderHook(() => useGitHubProfile('octocat'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.profile.status).toBe('success'));
    await waitFor(() => expect(result.current.repositories.status).toBe('success'));
    expect(result.current.profile.data).toEqual({ login: 'octocat' });
    expect(result.current.repositories.data).toEqual([{ id: 1, name: 'Hello-World' }]);
  });

  it('keeps the profile when repositories fail (partial success)', async () => {
    fetchUser.mockResolvedValue({ login: 'octocat' });
    fetchRepositories.mockRejectedValue(new GitHubError(GitHubErrorType.RATE_LIMIT, 'limited'));

    const { result } = renderHook(() => useGitHubProfile('octocat'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.profile.status).toBe('success'));
    await waitFor(() => expect(result.current.repositories.status).toBe('error'));
    expect(result.current.profile.data).toEqual({ login: 'octocat' });
    expect(result.current.repositories.error).toBeInstanceOf(GitHubError);
  });

  it('reflects only the latest username when it changes', async () => {
    fetchUser.mockImplementation((username) => Promise.resolve({ login: username }));
    fetchRepositories.mockResolvedValue([]);

    const { result, rerender } = renderHook(({ username }) => useGitHubProfile(username), {
      wrapper: createWrapper(),
      initialProps: { username: 'first' },
    });

    rerender({ username: 'second' });

    await waitFor(() => expect(result.current.profile.status).toBe('success'));
    expect(result.current.profile.data).toEqual({ login: 'second' });
  });
});
