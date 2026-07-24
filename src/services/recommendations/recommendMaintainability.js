import { buildRecommendation } from './buildRecommendation.js';

const RECOMMENDATIONS = {
  ARCHIVED_REPOSITORIES: {
    title: 'Reduce archived repositories',
    description:
      'A large share of your repositories are archived, which can make the portfolio look dormant.',
    priority: 'Low',
    actionItems: [
      'Unarchive projects you still maintain.',
      'Separate active work from archived experiments.',
    ],
    evidence: (analysis) =>
      `${analysis.counts.archived} of ${analysis.counts.total} repositories are archived.`,
  },
  MISSING_LICENSES: {
    title: 'Add licenses to repositories',
    description: 'Many repositories do not declare a license, which limits how others can reuse them.',
    priority: 'Medium',
    actionItems: [
      'Add an OSI-approved license to your public repositories.',
      'Choose a license that matches how you want your work reused.',
    ],
    evidence: (analysis) =>
      `${analysis.licenses.unlicensed} of ${analysis.counts.total} repositories have no license.`,
  },
};

/**
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 */
export function recommendMaintainability(analysis, score) {
  return score.maintainabilityScore.deductions.map((deduction) =>
    buildRecommendation(deduction, RECOMMENDATIONS[deduction.id], analysis),
  );
}
