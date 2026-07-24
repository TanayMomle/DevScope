import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import { useGitHubProfile } from '../hooks/useGitHubProfile.js';
import { GitHubError, GitHubErrorType } from '../api/errors.js';

vi.mock('../hooks/useGitHubProfile.js', () => ({ useGitHubProfile: vi.fn() }));

const user = {
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
};

const repository = {
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
};

const state = (overrides = {}) => ({
  profile: { status: 'idle', data: null, error: null },
  repositories: { status: 'idle', data: null, error: null },
  ...overrides,
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('App', () => {
  it('renders the brand and the search form when idle', () => {
    useGitHubProfile.mockReturnValue(state());
    render(<App />);

    expect(screen.getByRole('heading', { name: /devscope/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('shows an honest loading state', () => {
    useGitHubProfile.mockReturnValue(
      state({ profile: { status: 'loading', data: null, error: null } }),
    );
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/analyzing profile/i);
  });

  it('shows a friendly message when the user is not found', () => {
    useGitHubProfile.mockReturnValue(
      state({
        profile: {
          status: 'error',
          data: null,
          error: new GitHubError(GitHubErrorType.NOT_FOUND, 'missing'),
        },
      }),
    );
    render(<App />);

    expect(screen.getByRole('alert')).toHaveTextContent(/could not find/i);
  });

  it('renders the profile and repositories on success', () => {
    useGitHubProfile.mockReturnValue(
      state({
        profile: { status: 'success', data: user, error: null },
        repositories: { status: 'success', data: [repository], error: null },
      }),
    );
    render(<App />);

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hello-World' })).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('keeps the profile visible when repositories fail (partial success)', () => {
    useGitHubProfile.mockReturnValue(
      state({
        profile: { status: 'success', data: user, error: null },
        repositories: {
          status: 'error',
          data: null,
          error: new GitHubError(GitHubErrorType.RATE_LIMIT, 'limited'),
        },
      }),
    );
    render(<App />);

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/rate limit/i);
  });
});
