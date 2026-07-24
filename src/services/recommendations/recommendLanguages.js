import { buildRecommendation } from './buildRecommendation.js';

const RECOMMENDATIONS = {
  NO_LANGUAGES: {
    title: 'Add detectable source code',
    description: 'No programming languages were detected across your repositories.',
    priority: 'Medium',
    actionItems: [
      'Add source files so GitHub can detect languages.',
      'Ensure repositories contain committed code, not only documentation.',
    ],
    evidence: () => 'No languages were detected across your repositories.',
  },
  LANGUAGE_CONCENTRATION: {
    title: 'Diversify your languages',
    description: 'Your work is concentrated in a single language, which narrows the skills on display.',
    priority: 'Low',
    actionItems: [
      'Publish a project in a complementary language.',
      'Showcase breadth with a small project in a different ecosystem.',
    ],
    evidence: (analysis) => {
      const detected = Object.values(analysis.languages.distribution).reduce(
        (sum, count) => sum + count,
        0,
      );
      const [top] = analysis.languages.top;
      return `${top.name} is used in ${top.count} of ${detected} repositories with a detected language.`;
    },
  },
};

/**
 * @param {import('../../types/analysis.js').AnalysisResult} analysis
 * @param {import('../../types/scoring.js').PortfolioScore} score
 */
export function recommendLanguages(analysis, score) {
  return score.languageScore.deductions.map((deduction) =>
    buildRecommendation(deduction, RECOMMENDATIONS[deduction.id], analysis),
  );
}
