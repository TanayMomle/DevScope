import { describe, expect, it } from 'vitest';
import { calculateLanguages } from '../../services/analysis/languages.js';
import { makeRepository } from '../fixtures.js';

describe('calculateLanguages', () => {
  it('handles no repositories', () => {
    expect(calculateLanguages([])).toEqual({ distribution: {}, top: [] });
  });

  it('excludes repositories with a null language', () => {
    const repositories = [
      makeRepository({ id: 1, language: 'JavaScript' }),
      makeRepository({ id: 2, language: null }),
      makeRepository({ id: 3, language: 'JavaScript' }),
      makeRepository({ id: 4, language: 'Go' }),
    ];
    const result = calculateLanguages(repositories);

    expect(result.distribution).toEqual({ JavaScript: 2, Go: 1 });
    expect(result.top).toEqual([
      { name: 'JavaScript', count: 2 },
      { name: 'Go', count: 1 },
    ]);
  });

  it('orders ties alphabetically', () => {
    const repositories = [
      makeRepository({ id: 1, language: 'Python' }),
      makeRepository({ id: 2, language: 'Go' }),
    ];

    expect(calculateLanguages(repositories).top).toEqual([
      { name: 'Go', count: 1 },
      { name: 'Python', count: 1 },
    ]);
  });
});
