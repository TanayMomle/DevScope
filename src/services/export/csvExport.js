const escapeCsv = (value) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const row = (metric, value) => `${escapeCsv(metric)},${escapeCsv(value)}`;

/**
 * Serialize the headline metrics to a Metric,Value CSV. Numbers are emitted raw
 * (no thousands separators) so spreadsheets treat them as numeric. Output is
 * deterministic.
 *
 * @param {import('../../types/dashboard.js').DashboardModel} model
 * @returns {string}
 */
export function exportCsv(model) {
  const { analysis, score } = model;

  return [
    'Metric,Value',
    row('Username', analysis.username),
    row('Overall Score', score.overallScore),
    row('Repository Score', score.repositoryScore.value),
    row('Activity Score', score.activityScore.value),
    row('Language Score', score.languageScore.value),
    row('Quality Score', score.qualityScore.value),
    row('Maintainability Score', score.maintainabilityScore.value),
    row('Total Repositories', analysis.counts.total),
    row('Original Repositories', analysis.counts.original),
    row('Forked Repositories', analysis.counts.forked),
    row('Archived Repositories', analysis.counts.archived),
    row('Total Stars', analysis.stars.total),
    row('Total Forks', analysis.forks.total),
    row('Total Watchers', analysis.watchers),
    row('Open Issues', analysis.openIssues),
    row('Total Size (KB)', analysis.sizes.total),
    row('Average Size (KB)', analysis.sizes.average),
    row('Average Age (days)', analysis.age.averageAgeDays),
  ].join('\n');
}
