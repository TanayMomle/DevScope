import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePortfolioAnalysis } from '../hooks/usePortfolioAnalysis.js';
import { useGitHubProfile } from '../hooks/useGitHubProfile.js';
import { composeAnalysis } from '../services/analysis/composeAnalysis.js';
import { composeScore } from '../services/scoring/composeScore.js';
import { composeRecommendations } from '../services/recommendations/composeRecommendations.js';

vi.mock('../hooks/useGitHubProfile.js', () => ({ useGitHubProfile: vi.fn() }));
vi.mock('../services/analysis/composeAnalysis.js', () => ({ composeAnalysis: vi.fn() }));
vi.mock('../services/scoring/composeScore.js', () => ({ composeScore: vi.fn() }));
vi.mock('../services/recommendations/composeRecommendations.js', () => ({
  composeRecommendations: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

const success = (data) => ({ status: 'success', data, error: null });
const loading = { status: 'loading', data: null, error: null };

describe('usePortfolioAnalysis', () => {
  it('builds a dashboard model when profile and repositories both succeed', () => {
    useGitHubProfile.mockReturnValue({
      profile: success({ login: 'octocat' }),
      repositories: success([{ id: 1 }]),
    });
    const analysis = { counts: {} };
    const score = {
      overallScore: 50,
      repositoryScore: { deductions: [{ id: 'A', penalty: 5 }] },
      activityScore: { deductions: [] },
      languageScore: { deductions: [{ id: 'B', penalty: 12 }] },
      qualityScore: { deductions: [] },
      maintainabilityScore: { deductions: [] },
    };
    const recommendations = [{ id: 'REC' }];
    composeAnalysis.mockReturnValue(analysis);
    composeScore.mockReturnValue(score);
    composeRecommendations.mockReturnValue(recommendations);

    const { result } = renderHook(() => usePortfolioAnalysis('octocat'));

    expect(composeAnalysis).toHaveBeenCalledWith({ login: 'octocat' }, [{ id: 1 }]);
    expect(composeScore).toHaveBeenCalledWith(analysis);
    expect(composeRecommendations).toHaveBeenCalledWith(analysis, score);
    expect(result.current.dashboard.analysis).toBe(analysis);
    expect(result.current.dashboard.score).toBe(score);
    expect(result.current.dashboard.recommendations).toBe(recommendations);
    // Deductions are flattened and ordered by penalty, descending.
    expect(result.current.dashboard.topDeductions.map((deduction) => deduction.id)).toEqual([
      'B',
      'A',
    ]);
  });

  it('produces no dashboard while repositories are still loading', () => {
    useGitHubProfile.mockReturnValue({
      profile: success({ login: 'octocat' }),
      repositories: loading,
    });

    const { result } = renderHook(() => usePortfolioAnalysis('octocat'));

    expect(result.current.dashboard).toBeNull();
    expect(composeAnalysis).not.toHaveBeenCalled();
  });
});
