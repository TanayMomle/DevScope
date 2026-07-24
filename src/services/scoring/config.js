import { deepFreeze } from '../../utils/deepFreeze.js';

/**
 * Central scoring configuration. Category weights double as each category's
 * maximum and sum to 100; thresholds decide when a deduction applies; the
 * deduction catalog carries each penalty, category, and description; labels are
 * the human names for categories. Every number the engine uses lives here.
 */
export const config = deepFreeze({
  weights: {
    repository: 20,
    activity: 20,
    language: 20,
    quality: 20,
    maintainability: 20,
  },
  thresholds: {
    minRepositories: 5,
    maxForkRatio: 0.5,
    staleActivityDays: 365,
    maxLanguageConcentration: 0.75,
    maxArchivedRatio: 0.25,
    maxUnlicensedRatio: 0.5,
  },
  deductions: {
    FEW_REPOSITORIES: {
      category: 'repository',
      penalty: 10,
      description: 'Fewer public repositories than recommended.',
    },
    NO_ORIGINAL_REPOSITORIES: {
      category: 'repository',
      penalty: 8,
      description: 'The portfolio contains only forked repositories.',
    },
    EXCESSIVE_FORKS: {
      category: 'repository',
      penalty: 6,
      description: 'A large share of repositories are forks rather than original work.',
    },
    NO_ACTIVITY: {
      category: 'activity',
      penalty: 20,
      description: 'No repository has ever been pushed to.',
    },
    STALE_ACTIVITY: {
      category: 'activity',
      penalty: 10,
      description: 'No repository has been pushed to recently.',
    },
    NO_LANGUAGES: {
      category: 'language',
      penalty: 12,
      description: 'No programming languages were detected.',
    },
    LANGUAGE_CONCENTRATION: {
      category: 'language',
      penalty: 8,
      description: 'Repositories are concentrated in a single language.',
    },
    ZERO_STARS: {
      category: 'quality',
      penalty: 10,
      description: 'Repositories have received no stars.',
    },
    NO_TOPICS: {
      category: 'quality',
      penalty: 8,
      description: 'No repositories declare topics.',
    },
    ARCHIVED_REPOSITORIES: {
      category: 'maintainability',
      penalty: 10,
      description: 'A large share of repositories are archived.',
    },
    MISSING_LICENSES: {
      category: 'maintainability',
      penalty: 8,
      description: 'Many repositories do not declare a license.',
    },
  },
  labels: {
    repository: 'Repository Portfolio',
    activity: 'Activity & Recency',
    language: 'Language Diversity',
    quality: 'Quality Signals',
    maintainability: 'Maintainability',
  },
});
