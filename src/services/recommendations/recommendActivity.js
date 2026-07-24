import { formatDate } from '../../utils/format.js';
import { buildRecommendation } from './buildRecommendation.js';

const RECOMMENDATIONS = {
  NO_ACTIVITY: {
    title: 'Start pushing code',
    description: 'None of your repositories show any commits, so the portfolio looks inactive.',
    priority: 'High',
    actionItems: ['Push work to at least one repository.', 'Commit regularly, even small changes.'],
    evidence: () => 'None of your repositories have any recorded pushes.',
  },
  STALE_ACTIVITY: {
    title: 'Refresh recent activity',
    description: 'Your repositories have not been updated in a while, which can read as inactive.',
    priority: 'Medium',
    actionItems: [
      'Revisit an active project and push an update.',
      'Keep at least one repository under regular maintenance.',
    ],
    evidence: (analysis) =>
      `The most recent push was on ${formatDate(analysis.activity.lastActivityAt)}.`,
  },
};

/**
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 */
export function recommendActivity(analysis, score) {
  return score.activityScore.deductions.map((deduction) =>
    buildRecommendation(deduction, RECOMMENDATIONS[deduction.id], analysis),
  );
}
