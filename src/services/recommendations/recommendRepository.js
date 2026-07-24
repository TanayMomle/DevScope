import { buildRecommendation } from './buildRecommendation.js';

const RECOMMENDATIONS = {
  FEW_REPOSITORIES: {
    title: 'Publish more repositories',
    description: 'A larger body of public work gives reviewers a fuller picture of your skills.',
    priority: 'Medium',
    actionItems: [
      'Publish personal projects or experiments you have kept private.',
      'Turn coursework or prototypes into small, documented repositories.',
    ],
    evidence: (analysis) => `You have ${analysis.counts.total} public repositories.`,
  },
  NO_ORIGINAL_REPOSITORIES: {
    title: 'Add original repositories',
    description:
      'Your portfolio is made up entirely of forks; original work is what reviewers look for.',
    priority: 'High',
    actionItems: [
      'Create at least one repository that is your own work.',
      'Turn a fork you have substantially changed into a standalone project.',
    ],
    evidence: (analysis) => `All ${analysis.counts.total} of your repositories are forks.`,
  },
  EXCESSIVE_FORKS: {
    title: 'Balance forks with original work',
    description: 'Forks dominate your portfolio, which can obscure your own contributions.',
    priority: 'Low',
    actionItems: [
      'Feature your original repositories prominently.',
      'Archive or remove forks you no longer use.',
    ],
    evidence: (analysis) =>
      `${analysis.counts.forked} of ${analysis.counts.total} repositories are forks.`,
  },
};

/**
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 */
export function recommendRepository(analysis, score) {
  return score.repositoryScore.deductions.map((deduction) =>
    buildRecommendation(deduction, RECOMMENDATIONS[deduction.id], analysis),
  );
}
