import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard.jsx';
import { makeAnalysis, makeRepository, makeScore } from './fixtures.js';

vi.mock('recharts', () => import('./rechartsStub.jsx'));

const richAnalysis = makeAnalysis({
  stars: { total: 100, mostStarred: makeRepository({ name: 'star-repo', stargazersCount: 50 }) },
  forks: { total: 10, mostForked: makeRepository({ name: 'fork-repo', forksCount: 20 }) },
  languages: { distribution: { JavaScript: 4 }, top: [{ name: 'JavaScript', count: 4 }] },
  topics: { frequency: { cli: 2 }, top: [{ name: 'cli', count: 2 }] },
  licenses: { frequency: { MIT: 5 }, unlicensed: 1 },
  age: {
    oldest: makeRepository({ name: 'old-repo', createdAt: '2015-01-01T00:00:00Z' }),
    newest: makeRepository({ name: 'new-repo', createdAt: '2024-01-01T00:00:00Z' }),
    averageAgeDays: 800,
  },
  activity: {
    lastActivityAt: '2024-06-01T00:00:00Z',
    repository: makeRepository({ name: 'active-repo', pushedAt: '2024-06-01T00:00:00Z' }),
  },
  sizes: {
    total: 5000,
    average: 250,
    largest: makeRepository({ name: 'big-repo', size: 3000 }),
    smallest: makeRepository({ name: 'small-repo', size: 10 }),
  },
});

const scoreWithDeductions = makeScore({
  overallScore: 82,
  maintainabilityScore: {
    label: 'Maintainability',
    value: 10,
    max: 20,
    deductions: [
      {
        id: 'ARCHIVED_REPOSITORIES',
        category: 'maintainability',
        description: 'A large share of repositories are archived.',
        penalty: 10,
      },
    ],
  },
});

const model = {
  analysis: richAnalysis,
  score: scoreWithDeductions,
  topDeductions: scoreWithDeductions.maintainabilityScore.deductions,
  recommendations: [
    {
      id: 'ARCHIVED_REPOSITORIES',
      title: 'Reduce archived repositories',
      description: 'A large share of your repositories are archived.',
      priority: 'Low',
      category: 'maintainability',
      evidence: '3 of 10 repositories are archived.',
      improvementEstimate: 10,
      actionItems: ['Unarchive projects you still maintain.'],
    },
  ],
};

describe('Dashboard', () => {
  it('renders the overall score', () => {
    render(<Dashboard model={model} />);
    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: /overall portfolio score/i })).toHaveAttribute(
      'aria-valuenow',
      '82',
    );
  });

  it('renders the five category scores', () => {
    render(<Dashboard model={model} />);
    for (const label of [
      'Repository Portfolio',
      'Activity & Recency',
      'Language Diversity',
      'Quality Signals',
      'Maintainability',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('renders the summaries', () => {
    render(<Dashboard model={model} />);
    expect(screen.getByText('Repository Summary')).toBeInTheDocument();
    expect(screen.getByText('Repository Statistics')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('cli')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders the top deductions', () => {
    render(<Dashboard model={model} />);
    expect(screen.getByText('A large share of repositories are archived.')).toBeInTheDocument();
    expect(screen.getByText('-10')).toBeInTheDocument();
  });

  it('renders notable repositories', () => {
    render(<Dashboard model={model} />);
    for (const name of ['star-repo', 'fork-repo', 'big-repo', 'new-repo', 'old-repo', 'active-repo']) {
      expect(screen.getByRole('link', { name })).toBeInTheDocument();
    }
  });

  it('renders recommendation cards', () => {
    render(<Dashboard model={model} />);
    expect(screen.getByRole('heading', { name: 'Reduce archived repositories' })).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
    expect(screen.getByText('Unarchive projects you still maintain.')).toBeInTheDocument();
  });

  it('handles an empty analysis without crashing', () => {
    const emptyModel = {
      analysis: makeAnalysis({
        counts: { total: 0, original: 0, forked: 0, archived: 0, visibility: { public: 0, private: 0 } },
        stars: { total: 0, mostStarred: null },
        forks: { total: 0, mostForked: null },
        watchers: 0,
        openIssues: 0,
        languages: { distribution: {}, top: [] },
        topics: { frequency: {}, top: [] },
        licenses: { frequency: {}, unlicensed: 0 },
        age: { oldest: null, newest: null, averageAgeDays: 0 },
        activity: { lastActivityAt: null, repository: null },
        sizes: { total: 0, average: 0, largest: null, smallest: null },
      }),
      score: makeScore({ overallScore: 40 }),
      topDeductions: [],
      recommendations: [],
    };
    render(<Dashboard model={emptyModel} />);

    expect(screen.getByText('40')).toBeInTheDocument();
    expect(screen.getByText('No repositories to highlight.')).toBeInTheDocument();
    expect(screen.getByText(/great shape/i)).toBeInTheDocument();
  });
});
