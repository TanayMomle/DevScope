import { formatNumber } from '../../utils/format.js';

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const table = (pairs) =>
  `<table><tbody>${pairs
    .map(([label, value]) => `<tr><th scope="row">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join('')}</tbody></table>`;

const recommendation = (item) => `
    <article class="rec">
      <h3>${escapeHtml(item.title)} <span class="badge">${escapeHtml(item.priority)}</span></h3>
      <p class="meta">${escapeHtml(item.category)} &middot; +${escapeHtml(item.improvementEstimate)} pts</p>
      <p>${escapeHtml(item.description)}</p>
      <p class="muted">${escapeHtml(item.evidence)}</p>
      <ul>${item.actionItems.map((action) => `<li>${escapeHtml(action)}</li>`).join('')}</ul>
    </article>`;

/**
 * Build a self-contained, print-friendly HTML report. Uses a light theme for
 * printing, inlines all styles, escapes dynamic content, and includes no
 * timestamps, so output is deterministic.
 *
 * @param {import('../../types/dashboard.js').DashboardModel} model
 * @returns {string}
 */
export function exportHtml(model) {
  const { analysis, score, recommendations } = model;

  const scoreRows = [
    score.repositoryScore,
    score.activityScore,
    score.languageScore,
    score.qualityScore,
    score.maintainabilityScore,
  ].map((category) => [category.label, `${category.value} / ${category.max}`]);

  const summaryRows = [
    ['Total repositories', formatNumber(analysis.counts.total)],
    ['Original', formatNumber(analysis.counts.original)],
    ['Forked', formatNumber(analysis.counts.forked)],
    ['Archived', formatNumber(analysis.counts.archived)],
  ];

  const statRows = [
    ['Stars', formatNumber(analysis.stars.total)],
    ['Forks', formatNumber(analysis.forks.total)],
    ['Watchers', formatNumber(analysis.watchers)],
    ['Open issues', formatNumber(analysis.openIssues)],
    ['Total size (KB)', formatNumber(analysis.sizes.total)],
    ['Average age (days)', formatNumber(analysis.age.averageAgeDays)],
  ];

  const languageRows = analysis.languages.top.map((entry) => [entry.name, formatNumber(entry.count)]);

  const recommendationsHtml = recommendations.length
    ? recommendations.map(recommendation).join('')
    : '<p class="muted">No recommendations — this portfolio is in great shape.</p>';

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>DevScope Report — ${escapeHtml(analysis.username)}</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 2rem auto; max-width: 900px; padding: 0 1rem; line-height: 1.5; }
  header { border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1rem; }
  h1 { margin: 0; font-size: 1.5rem; }
  h2 { font-size: 1.05rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem; margin-top: 2rem; }
  .score { font-size: 3rem; font-weight: 700; margin: 0.5rem 0 0; }
  table { border-collapse: collapse; width: 100%; }
  th, td { padding: 0.35rem 0.5rem; border-bottom: 1px solid #f1f5f9; }
  th[scope="row"] { text-align: left; color: #475569; font-weight: 500; }
  td { text-align: right; }
  .muted { color: #64748b; }
  .rec { border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 1rem; margin: 0.75rem 0; }
  .rec h3 { margin: 0.25rem 0; font-size: 1rem; }
  .rec ul { margin: 0.5rem 0 0.25rem; }
  .badge { font-size: 0.7rem; background: #f1f5f9; border-radius: 999px; padding: 0.1rem 0.5rem; font-weight: 500; }
  .meta { font-size: 0.7rem; text-transform: uppercase; color: #94a3b8; margin: 0 0 0.35rem; }
  @media print { body { margin: 0.5rem; } }
</style>
</head>
<body>
  <header>
    <h1>DevScope Portfolio Report</h1>
    <p class="muted">@${escapeHtml(analysis.username)}</p>
    <p class="score">${escapeHtml(score.overallScore)}<span class="muted" style="font-size: 1rem;"> / 100</span></p>
  </header>

  <h2>Score Breakdown</h2>
  ${table(scoreRows)}

  <h2>Repository Summary</h2>
  ${table(summaryRows)}

  <h2>Statistics</h2>
  ${table(statRows)}

  <h2>Languages</h2>
  ${languageRows.length ? table(languageRows) : '<p class="muted">None</p>'}

  <h2>Recommendations</h2>
  ${recommendationsHtml}
</body>
</html>`;
}
