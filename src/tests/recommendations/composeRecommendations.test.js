import { describe, expect, it } from 'vitest';
import { composeRecommendations } from '../../services/recommendations/composeRecommendations.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const category = (label, deductions) => ({ label, value: 0, max: 20, deductions });

describe('composeRecommendations', () => {
  it('returns nothing for an excellent portfolio', () => {
    expect(composeRecommendations(makeAnalysis(), makeScore())).toEqual([]);
  });

  it('orders by score impact, then priority, then id', () => {
    const score = makeScore({
      repositoryScore: category('Repository Portfolio', [
        { id: 'FEW_REPOSITORIES', category: 'repository', penalty: 10 },
      ]),
      activityScore: category('Activity & Recency', [
        { id: 'NO_ACTIVITY', category: 'activity', penalty: 20 },
      ]),
      languageScore: category('Language Diversity', [
        { id: 'NO_LANGUAGES', category: 'language', penalty: 12 },
      ]),
      qualityScore: category('Quality Signals', [
        { id: 'ZERO_STARS', category: 'quality', penalty: 10 },
        { id: 'NO_TOPICS', category: 'quality', penalty: 8 },
      ]),
    });

    const recommendations = composeRecommendations(makeAnalysis(), score);

    // 20, 12, then the two 10s broken by priority (Medium before Low), then 8.
    expect(recommendations.map((recommendation) => recommendation.id)).toEqual([
      'NO_ACTIVITY',
      'NO_LANGUAGES',
      'FEW_REPOSITORIES',
      'ZERO_STARS',
      'NO_TOPICS',
    ]);
  });

  it('produces a unique, deterministic, frozen recommendation for every deduction', () => {
    const score = makeScore({
      repositoryScore: category('Repository Portfolio', [
        { id: 'FEW_REPOSITORIES', category: 'repository', penalty: 10 },
        { id: 'NO_ORIGINAL_REPOSITORIES', category: 'repository', penalty: 8 },
        { id: 'EXCESSIVE_FORKS', category: 'repository', penalty: 6 },
      ]),
      activityScore: category('Activity & Recency', [
        { id: 'NO_ACTIVITY', category: 'activity', penalty: 20 },
        { id: 'STALE_ACTIVITY', category: 'activity', penalty: 10 },
      ]),
      languageScore: category('Language Diversity', [
        { id: 'NO_LANGUAGES', category: 'language', penalty: 12 },
        { id: 'LANGUAGE_CONCENTRATION', category: 'language', penalty: 8 },
      ]),
      qualityScore: category('Quality Signals', [
        { id: 'ZERO_STARS', category: 'quality', penalty: 10 },
        { id: 'NO_TOPICS', category: 'quality', penalty: 8 },
      ]),
      maintainabilityScore: category('Maintainability', [
        { id: 'ARCHIVED_REPOSITORIES', category: 'maintainability', penalty: 10 },
        { id: 'MISSING_LICENSES', category: 'maintainability', penalty: 8 },
      ]),
    });
    const analysis = makeAnalysis();

    const recommendations = composeRecommendations(analysis, score);

    expect(recommendations).toHaveLength(11);
    expect(new Set(recommendations.map((recommendation) => recommendation.id)).size).toBe(11);
    for (const recommendation of recommendations) {
      expect(recommendation.title).toBeTruthy();
      expect(recommendation.actionItems.length).toBeGreaterThan(0);
    }
    expect(Object.isFrozen(recommendations)).toBe(true);
    // Deterministic: identical inputs yield identical output.
    expect(composeRecommendations(analysis, score)).toEqual(recommendations);
  });
});
