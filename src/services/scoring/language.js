import { config } from './config.js';
import { scoreCategory } from './scoreCategory.js';

/**
 * Score language breadth: languages are present and not overly concentrated in
 * a single one.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 */
export function scoreLanguage(analysis) {
  const counts = Object.values(analysis.languages.distribution);
  const ids = [];

  if (counts.length === 0) {
    ids.push('NO_LANGUAGES');
  } else {
    const total = counts.reduce((sum, count) => sum + count, 0);
    if (Math.max(...counts) / total > config.thresholds.maxLanguageConcentration) {
      ids.push('LANGUAGE_CONCENTRATION');
    }
  }

  return scoreCategory('language', ids);
}
