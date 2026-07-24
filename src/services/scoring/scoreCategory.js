import { config } from './config.js';

/**
 * Build a category's score from the deductions that were triggered. The maximum
 * is the category weight; the value is the max minus penalties, floored at 0.
 *
 * @param {'repository' | 'activity' | 'language' | 'quality' | 'maintainability'} category
 * @param {string[]} deductionIds
 * @returns {import('../../types/scoring.js').ScoreBreakdown}
 */
export function scoreCategory(category, deductionIds) {
  const max = config.weights[category];
  const deductions = deductionIds.map((id) => {
    const { category: deductionCategory, description, penalty } = config.deductions[id];
    return { id, category: deductionCategory, description, penalty };
  });
  const penalty = deductions.reduce((sum, deduction) => sum + deduction.penalty, 0);

  return {
    label: config.labels[category],
    value: Math.max(0, max - penalty),
    max,
    deductions,
  };
}
