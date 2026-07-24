import { act, renderHook } from '@testing-library/react';
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

describe('useGitHubProfile', () => {
  it('starts idle', () => {
    const { result } = renderHook(() => useGitHubProfile());

    expect(result.current.status).toBe('idle');
    expect(result.current.profile).toBeNull();
    expect(result.current.repositories).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads the profile and repositories on success', async () => {
    fetchUser.mockResolvedValue({ login: 'octocat' });
    fetchRepositories.mockResolvedValue([{ id: 1, name: 'Hello-World' }]);

    const { result } = renderHook(() => useGitHubProfile());
    await act(async () => {
      await result.current.analyze('octocat');
    });

    expect(result.current.status).toBe('success');
    expect(result.current.profile).toEqual({ login: 'octocat' });
    expect(result.current.repositories).toEqual([{ id: 1, name: 'Hello-World' }]);
    expect(result.current.error).toBeNull();
    expect(fetchUser).toHaveBeenCalledWith('octocat');
  });

  it('captures the error raised by the service', async () => {
    const failure = new GitHubError(GitHubErrorType.NOT_FOUND, 'missing');
    fetchUser.mockRejectedValue(failure);
    fetchRepositories.mockRejectedValue(failure);

    const { result } = renderHook(() => useGitHubProfile());
    await act(async () => {
      await result.current.analyze('ghost-user');
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe(failure);
    expect(result.current.profile).toBeNull();
    expect(result.current.repositories).toEqual([]);
  });
});
