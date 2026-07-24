import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App.jsx';
import { usePortfolioAnalysis } from '../hooks/usePortfolioAnalysis.js';
import { GitHubError, GitHubErrorType } from '../api/errors.js';
import { makeAnalysis, makeScore, makeUser } from './fixtures.js';

vi.mock('../hooks/usePortfolioAnalysis.js', () => ({ usePortfolioAnalysis: vi.fn() }));
vi.mock('recharts', () => import('./rechartsStub.jsx'));

const state = (overrides = {}) => ({
  profile: { status: 'idle', data: null, error: null },
  repositories: { status: 'idle', data: null, error: null },
  dashboard: null,
  ...overrides,
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('App', () => {
  it('renders the brand and the search form when idle', () => {
    usePortfolioAnalysis.mockReturnValue(state());
    render(<App />);

    expect(screen.getByRole('heading', { name: /devscope/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('search')).toBeInTheDocument();
  });

  it('shows an honest loading state', () => {
    usePortfolioAnalysis.mockReturnValue(
      state({ profile: { status: 'loading', data: null, error: null } }),
    );
    render(<App />);

    expect(screen.getByRole('status')).toHaveTextContent(/analyzing profile/i);
  });

  it('shows a friendly message when the user is not found', () => {
    usePortfolioAnalysis.mockReturnValue(
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

  it('keeps the profile visible when repositories fail', () => {
    usePortfolioAnalysis.mockReturnValue(
      state({
        profile: { status: 'success', data: makeUser({ name: 'The Octocat' }), error: null },
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

  it('renders the dashboard on success', () => {
    usePortfolioAnalysis.mockReturnValue(
      state({
        profile: { status: 'success', data: makeUser({ name: 'The Octocat' }), error: null },
        repositories: { status: 'success', data: [], error: null },
        dashboard: { analysis: makeAnalysis(), score: makeScore({ overallScore: 91 }), topDeductions: [] },
      }),
    );
    render(<App />);

    expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeInTheDocument();
    expect(screen.getByText('Portfolio Score')).toBeInTheDocument();
    expect(screen.getByText('91')).toBeInTheDocument();
  });
});
