/**
 * Serialize the dashboard model to a stable, pretty-printed JSON string.
 * Key order is fixed and no timestamps are included, so output is deterministic.
 *
 * @param {import('../../types/dashboard.js').DashboardModel} model
 * @returns {string}
 */
export function exportJson(model) {
  const payload = {
    username: model.analysis.username,
    overallScore: model.score.overallScore,
    analysis: model.analysis,
    score: model.score,
    recommendations: model.recommendations,
  };

  return JSON.stringify(payload, null, 2);
}
