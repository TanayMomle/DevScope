import { scoreCategory } from './scoreCategory.js';

/**
 * Score quality signals: whether the work has attracted stars and whether
 * repositories are made discoverable with topics.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 */
export function scoreQuality(analysis) {
  const ids = [];

  if (analysis.stars.total === 0) ids.push('ZERO_STARS');
  if (Object.keys(analysis.topics.frequency).length === 0) ids.push('NO_TOPICS');

  return scoreCategory('quality', ids);
}
