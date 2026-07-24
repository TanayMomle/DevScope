import { deepFreeze } from '../../utils/deepFreeze.js';
import { recommendRepository } from './recommendRepository.js';
import { recommendActivity } from './recommendActivity.js';
import { recommendLanguages } from './recommendLanguages.js';
import { recommendQuality } from './recommendQuality.js';
import { recommendMaintainability } from './recommendMaintainability.js';

const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

/**
 * Compose all portfolio recommendations from the analysis and score, ordered by
 * score impact (desc), then priority, then a stable id tie-break. Every
 * recommendation maps to exactly one triggered deduction, so there are no
 * duplicates.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 * @returns {import('../../types/recommendations.js').Recommendation[]}
 */
export function composeRecommendations(analysis, score) {
  const recommendations = [
    ...recommendRepository(analysis, score),
    ...recommendActivity(analysis, score),
    ...recommendLanguages(analysis, score),
    ...recommendQuality(analysis, score),
    ...recommendMaintainability(analysis, score),
  ].sort(
    (a, b) =>
      b.improvementEstimate - a.improvementEstimate ||
      PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] ||
      (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
  );

  return deepFreeze(recommendations);
}
