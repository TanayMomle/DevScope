import { useMemo } from 'react';
import { useGitHubProfile } from './useGitHubProfile.js';
import { composeAnalysis } from '../services/analysis/composeAnalysis.js';
import { composeScore } from '../services/scoring/composeScore.js';

/**
 * Flatten every category's deductions into one list ordered by penalty (desc),
 * with a stable tie-break on id. This arranges existing data for display; it
 * computes no new metric.
 *
 * @param {import('../types/scoring.js').PortfolioScore} score
 * @returns {import('../types/scoring.js').Deduction[]}
 */
function collectTopDeductions(score) {
  return [
    score.repositoryScore,
    score.activityScore,
    score.languageScore,
    score.qualityScore,
    score.maintainabilityScore,
  ]
    .flatMap((category) => category.deductions)
    .sort((a, b) => b.penalty - a.penalty || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}

/**
 * Wire the data and engines into a single dashboard model: fetch the profile
 * and repositories, then run composeAnalysis and composeScore once both are
 * available. Returns null for `dashboard` until the full data set is ready.
 *
 * @param {string} username
 */
export function usePortfolioAnalysis(username) {
  const { profile, repositories } = useGitHubProfile(username);

  const dashboard = useMemo(() => {
    if (profile.status !== 'success' || repositories.status !== 'success') {
      return null;
    }
    const analysis = composeAnalysis(profile.data, repositories.data);
    const score = composeScore(analysis);
    return { analysis, score, topDeductions: collectTopDeductions(score) };
  }, [profile.status, profile.data, repositories.status, repositories.data]);

  return { profile, repositories, dashboard };
}
