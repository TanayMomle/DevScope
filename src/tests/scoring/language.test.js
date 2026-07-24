import { describe, expect, it } from 'vitest';
import { scoreLanguage } from '../../services/scoring/language.js';

const ids = (result) => result.deductions.map((deduction) => deduction.id);
const withLanguages = (distribution) => ({ languages: { distribution } });

describe('scoreLanguage', () => {
  it('penalizes an absence of languages', () => {
    expect(ids(scoreLanguage(withLanguages({})))).toContain('NO_LANGUAGES');
  });

  it('penalizes single-language concentration', () => {
    expect(ids(scoreLanguage(withLanguages({ JavaScript: 5 })))).toContain('LANGUAGE_CONCENTRATION');
  });

  it('does not penalize a set at the concentration boundary', () => {
    // 3 of 4 = 0.75, not greater than the threshold.
    expect(ids(scoreLanguage(withLanguages({ JavaScript: 3, Python: 1 })))).not.toContain(
      'LANGUAGE_CONCENTRATION',
    );
  });

  it('gives a diverse portfolio no deductions', () => {
    expect(scoreLanguage(withLanguages({ JavaScript: 4, Python: 3, Go: 3 })).deductions).toEqual([]);
  });
});
