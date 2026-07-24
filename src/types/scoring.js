/**
 * Types for the portfolio scoring engine. `PortfolioScore` is the single,
 * immutable value the UI reads; it never recomputes scores itself.
 */

/**
 * A single measurable reason points were deducted from a category.
 *
 * @typedef {Object} Deduction
 * @property {string} id
 * @property {string} category
 * @property {string} description
 * @property {number} penalty
 */

/**
 * One category's score: its value out of `max`, and the deductions applied.
 *
 * @typedef {Object} ScoreBreakdown
 * @property {string} label
 * @property {number} value
 * @property {number} max
 * @property {Deduction[]} deductions
 */

/**
 * @typedef {Object} PortfolioScore
 * @property {number} overallScore
 * @property {ScoreBreakdown} repositoryScore
 * @property {ScoreBreakdown} activityScore
 * @property {ScoreBreakdown} languageScore
 * @property {ScoreBreakdown} qualityScore
 * @property {ScoreBreakdown} maintainabilityScore
 */

export {};
