import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardCharts from '../components/charts/DashboardCharts.jsx';
import { makeAnalysis } from './fixtures.js';

vi.mock('recharts', () => import('./rechartsStub.jsx'));

describe('DashboardCharts', () => {
  it('renders a titled card for each of the five visualizations', () => {
    render(<DashboardCharts analysis={makeAnalysis()} />);

    for (const title of [
      'Language Distribution',
      'Repository Creation Timeline',
      'Stars vs Forks',
      'Topic Frequency',
      'License Distribution',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
  });

  it('renders an accessible chart region when data exists', () => {
    render(<DashboardCharts analysis={makeAnalysis()} />);

    expect(screen.getByRole('img', { name: /language distribution/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /repository creation timeline/i })).toBeInTheDocument();
  });

  it('shows an empty state for every chart when no data exists', () => {
    const analysis = makeAnalysis({
      languages: { distribution: {}, top: [] },
      topics: { frequency: {}, top: [] },
      licenses: { frequency: {}, unlicensed: 0 },
      stars: { total: 0, mostStarred: null },
      forks: { total: 0, mostForked: null },
      timeline: [],
    });

    render(<DashboardCharts analysis={analysis} />);

    expect(screen.getAllByText('No data to display.')).toHaveLength(5);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
