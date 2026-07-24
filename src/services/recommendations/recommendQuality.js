import { buildRecommendation } from './buildRecommendation.js';

const RECOMMENDATIONS = {
  ZERO_STARS: {
    title: 'Increase repository visibility',
    description: 'Your repositories have not attracted any stars yet.',
    priority: 'Low',
    actionItems: [
      'Write clear READMEs that explain the value of each project.',
      'Share notable projects where relevant communities will see them.',
    ],
    evidence: () => 'Your repositories have not received any stars yet.',
  },
  NO_TOPICS: {
    title: 'Add topics to repositories',
    description: 'None of your repositories declare topics, which hurts discoverability.',
    priority: 'Medium',
    actionItems: [
      'Add descriptive topics to your most important repositories.',
      'Use consistent, relevant topic tags.',
    ],
    evidence: () => 'None of your repositories declare topics.',
  },
};

/**
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 */
export function recommendQuality(analysis, score) {
  return score.qualityScore.deductions.map((deduction) =>
    buildRecommendation(deduction, RECOMMENDATIONS[deduction.id], analysis),
  );
}
