import { describe, expect, it } from 'vitest';
import { recommendRepository } from '../../services/recommendations/recommendRepository.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const scoreWith = (deductions) =>
  makeScore({ repositoryScore: { label: 'Repository Portfolio', value: 0, max: 20, deductions } });

describe('recommendRepository', () => {
  it('returns nothing when the category has no deductions', () => {
    expect(recommendRepository(makeAnalysis(), makeScore())).toEqual([]);
  });

  it('maps each deduction to a recommendation with impact, priority and evidence', () => {
    const analysis = makeAnalysis({
      counts: { total: 2, original: 0, forked: 2, archived: 0, visibility: { public: 2, private: 0 } },
    });
    const score = scoreWith([
      { id: 'NO_ORIGINAL_REPOSITORIES', category: 'repository', penalty: 8 },
      { id: 'EXCESSIVE_FORKS', category: 'repository', penalty: 6 },
    ]);

    const recommendations = recommendRepository(analysis, score);

    expect(recommendations.map((recommendation) => recommendation.id)).toEqual([
      'NO_ORIGINAL_REPOSITORIES',
      'EXCESSIVE_FORKS',
    ]);
    expect(recommendations[0]).toMatchObject({
      category: 'repository',
      priority: 'High',
      improvementEstimate: 8,
    });
    expect(recommendations[0].actionItems.length).toBeGreaterThan(0);
    expect(recommendations[0].evidence).toContain('2');
  });
});
