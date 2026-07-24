/**
 * Assemble a recommendation from a triggered deduction and its template. The
 * estimated score gain is exactly the deduction's penalty — the points
 * recovered by resolving it.
 *
 * @param {import('../../types/scoring.js').Deduction} deduction
 * @param {{
 *   title: string,
 *   description: string,
 *   priority: 'High' | 'Medium' | 'Low',
 *   actionItems: string[],
 *   evidence: (analysis: import('../../types/analysis.js').AnalysisResult) => string,
 * }} template
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @returns {import('../../types/recommendations.js').Recommendation}
 */
export function buildRecommendation(deduction, template, analysis) {
  return {
    id: deduction.id,
    title: template.title,
    description: template.description,
    priority: template.priority,
    category: deduction.category,
    evidence: template.evidence(analysis),
    improvementEstimate: deduction.penalty,
    actionItems: template.actionItems,
  };
}
