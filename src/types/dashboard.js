/**
 * The single model the dashboard renders. It bundles the analysis, the score,
 * and the score's deductions flattened and ordered by impact — all produced by
 * the existing engines, never recomputed in the UI.
 *
 * @typedef {Object} DashboardModel
 * @property {import('./analysis.js').AnalysisResult} analysis
 * @property {import('./scoring.js').PortfolioScore} score
 * @property {import('./scoring.js').Deduction[]} topDeductions
 */

export {};
