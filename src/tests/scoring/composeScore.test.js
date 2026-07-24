import { describe, expect, it } from 'vitest';
import { composeScore } from '../../services/scoring/composeScore.js';
import { makeAnalysis } from '../fixtures.js';

const NOW = new Date('2026-01-01T00:00:00Z');
const CATEGORY_KEYS = [
  'repositoryScore',
  'activityScore',
  'languageScore',
  'qualityScore',
  'maintainabilityScore',
];

describe('composeScore', () => {
  it('scores a strong portfolio at 100 with no deductions', () => {
    const score = composeScore(makeAnalysis(), { now: NOW });

    expect(score.overallScore).toBe(100);
    for (const key of CATEGORY_KEYS) {
      expect(score[key].value).toBe(20);
      expect(score[key].deductions).toEqual([]);
    }
  });

  it('scores a poor portfolio low with the expected deductions', () => {
    const analysis = makeAnalysis({
      counts: { total: 1, original: 0, forked: 1, archived: 1, visibility: { public: 1, private: 0 } },
      stars: { total: 0, mostStarred: null },
      languages: { distribution: {}, top: [] },
      topics: { frequency: {}, top: [] },
      licenses: { frequency: {}, unlicensed: 1 },
      activity: { lastActivityAt: null, repository: null },
    });
    const score = composeScore(analysis, { now: NOW });

    expect(score.overallScore).toBe(12);
    expect(score.repositoryScore.value).toBe(0);
    expect(score.activityScore.value).toBe(0);
    expect(score.repositoryScore.deductions.map((deduction) => deduction.id)).toEqual([
      'FEW_REPOSITORIES',
      'NO_ORIGINAL_REPOSITORIES',
      'EXCESSIVE_FORKS',
    ]);
  });

  it('produces a complete result for an empty analysis', () => {
    const analysis = makeAnalysis({
      counts: { total: 0, original: 0, forked: 0, archived: 0, visibility: { public: 0, private: 0 } },
      stars: { total: 0, mostStarred: null },
      forks: { total: 0, mostForked: null },
      watchers: 0,
      openIssues: 0,
      languages: { distribution: {}, top: [] },
      topics: { frequency: {}, top: [] },
      licenses: { frequency: {}, unlicensed: 0 },
      activity: { lastActivityAt: null, repository: null },
      sizes: { total: 0, average: 0, largest: null, smallest: null },
    });
    const score = composeScore(analysis, { now: NOW });

    expect(score.overallScore).toBe(40);
    expect(score.maintainabilityScore.deductions).toEqual([]);
    expect(score.repositoryScore.deductions.map((deduction) => deduction.id)).toEqual([
      'FEW_REPOSITORIES',
    ]);
  });

  it('returns a deeply frozen, immutable result', () => {
    const score = composeScore(makeAnalysis(), { now: NOW });

    expect(Object.isFrozen(score)).toBe(true);
    expect(Object.isFrozen(score.repositoryScore)).toBe(true);
    expect(Object.isFrozen(score.repositoryScore.deductions)).toBe(true);
    expect(() => {
      score.overallScore = 0;
    }).toThrow();
  });
});
