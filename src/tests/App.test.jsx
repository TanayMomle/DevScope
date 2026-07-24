import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import { useGitHubProfile } from '../hooks/useGitHubProfile.js';
import { GitHubError, GitHubErrorType } from '../api/errors.js';

vi.mock('../hooks/useGitHubProfile.js', () => ({ useGitHubProfile: vi.fn() }));

const idleState = {
  status: 'idle',
  profile: null,
  repositories: [],
  error: null,
  analyze: vi.fn(),
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('App', () => {
  it('renders the brand and the search form when idle', () => {
    useGitHubProfile.mockReturnValue(idleState);
    render(<App />);

    expect(screen.getByRole('heading', { name: /devscope/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('shows an honest loading state', () => {
    useGitHubProfile.mockReturnValue({ ...idleState, status: 'loading' });
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/analyzing profile/i);
  });

  it('shows a friendly message when the user is not found', () => {
    useGitHubProfile.mockReturnValue({
      ...idleState,
      status: 'error',
      error: new GitHubError(GitHubErrorType.NOT_FOUND, 'missing'),
    });
    render(<App />);

    expect(screen.getByRole('alert')).toHaveTextContent(/could not find/i);
  });

  it('renders the profile and repositories on success', () => {
    useGitHubProfile.mockReturnValue({
      ...idleState,
      status: 'success',
      profile: {
        login: 'octocat',
        id: 1,
        name: 'The Octocat',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1?v=4',
        htmlUrl: 'https://github.com/octocat',
        bio: '',
        company: '',
        location: '',
        blog: '',
        followers: 1,
        following: 2,
        publicRepos: 3,
        publicGists: 0,
        createdAt: '2011-01-25T18:44:36Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      repositories: [
        {
          id: 1,
          name: 'Hello-World',
          description: 'My first repository on GitHub!',
          htmlUrl: 'https://github.com/octocat/Hello-World',
          homepage: null,
          language: 'JavaScript',
          topics: [],
          license: null,
          stargazersCount: 5,
          forksCount: 2,
          watchersCount: 5,
          openIssuesCount: 0,
          size: 1,
          fork: false,
          archived: false,
          defaultBranch: 'main',
          createdAt: '2011-01-26T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          pushedAt: '2024-01-01T00:00:00Z',
          owner: { login: 'octocat', id: 1, type: 'User', avatarUrl: 'x', htmlUrl: 'y' },
        },
      ],
    });
    render(<App />);

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hello-World' })).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });
});
