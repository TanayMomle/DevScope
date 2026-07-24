import { config } from './config.js';
import { scoreCategory } from './scoreCategory.js';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Score recency of activity relative to `now`.
 *
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {Date} now
 */
export function scoreActivity(analysis, now) {
  const { lastActivityAt } = analysis.activity;
  const ids = [];

  if (lastActivityAt === null) {
    ids.push('NO_ACTIVITY');
  } else {
    const daysSince = (now.getTime() - new Date(lastActivityAt).getTime()) / MS_PER_DAY;
    if (daysSince > config.thresholds.staleActivityDays) ids.push('STALE_ACTIVITY');
  }

  return scoreCategory('activity', ids);
}
