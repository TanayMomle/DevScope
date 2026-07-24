import { describe, expect, it } from 'vitest';
import { recommendLanguages } from '../../services/recommendations/recommendLanguages.js';
import { makeAnalysis, makeScore } from '../fixtures.js';

const scoreWith = (deductions) =>
  makeScore({ languageScore: { label: 'Language Diversity', value: 0, max: 20, deductions } });

describe('recommendLanguages', () => {
  it('recommends adding source code when no languages are detected', () => {
    const score = scoreWith([{ id: 'NO_LANGUAGES', category: 'language', penalty: 12 }]);

    const [recommendation] = recommendLanguages(makeAnalysis(), score);

    expect(recommendation).toMatchObject({ id: 'NO_LANGUAGES', improvementEstimate: 12 });
  });

  it('cites the dominant language when concentrated', () => {
    const analysis = makeAnalysis({
      languages: { distribution: { JavaScript: 8 }, top: [{ name: 'JavaScript', count: 8 }] },
    });
    const score = scoreWith([{ id: 'LANGUAGE_CONCENTRATION', category: 'language', penalty: 8 }]);

    const [recommendation] = recommendLanguages(analysis, score);

    expect(recommendation.priority).toBe('Low');
    expect(recommendation.evidence).toContain('JavaScript');
    expect(recommendation.evidence).toContain('8');
  });
});
