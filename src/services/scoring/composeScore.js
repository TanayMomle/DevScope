import { deepFreeze } from '../../utils/deepFreeze.js';
import { scoreRepository } from './repository.js';
import { scoreActivity } from './activity.js';
import { scoreLanguage } from './language.js';
import { scoreQuality } from './quality.js';
import { scoreMaintainability } from './maintainability.js';

/**
 * Compose the full, immutable portfolio score from an analysis result. The
 * overall score is the sum of the category values (their maxima total 100).
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {{ now?: Date }} [options] - `now` is injectable so activity scoring is testable.
 * @returns {import('../../types/scoring.js').PortfolioScore}
 */
export function composeScore(analysis, { now = new Date() } = {}) {
  const repositoryScore = scoreRepository(analysis);
  const activityScore = scoreActivity(analysis, now);
  const languageScore = scoreLanguage(analysis);
  const qualityScore = scoreQuality(analysis);
  const maintainabilityScore = scoreMaintainability(analysis);

  const overallScore =
    repositoryScore.value +
    activityScore.value +
    languageScore.value +
    qualityScore.value +
    maintainabilityScore.value;

  return deepFreeze({
    overallScore,
    repositoryScore,
    activityScore,
    languageScore,
    qualityScore,
    maintainabilityScore,
  });
}
