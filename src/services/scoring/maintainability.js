import { config } from './config.js';
import { scoreCategory } from './scoreCategory.js';

/**
 * Score maintainability: repositories are kept active (not archived) and set up
 * for reuse with a license.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 */
export function scoreMaintainability(analysis) {
  const { total, archived } = analysis.counts;
  const { unlicensed } = analysis.licenses;
  const ids = [];

  if (total > 0 && archived / total > config.thresholds.maxArchivedRatio) {
    ids.push('ARCHIVED_REPOSITORIES');
  }
  if (total > 0 && unlicensed / total > config.thresholds.maxUnlicensedRatio) {
    ids.push('MISSING_LICENSES');
  }

  return scoreCategory('maintainability', ids);
}
