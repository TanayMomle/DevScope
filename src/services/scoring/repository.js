import { config } from './config.js';
import { scoreCategory } from './scoreCategory.js';

/**
 * Score the repository collection: enough repositories, original work, and not
 * dominated by forks.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 */
export function scoreRepository(analysis) {
  const { total, original, forked } = analysis.counts;
  const ids = [];

  if (total < config.thresholds.minRepositories) ids.push('FEW_REPOSITORIES');
  if (total > 0 && original === 0) ids.push('NO_ORIGINAL_REPOSITORIES');
  if (total > 0 && forked / total > config.thresholds.maxForkRatio) ids.push('EXCESSIVE_FORKS');

  return scoreCategory('repository', ids);
}
