import { describe, expect, it } from 'vitest';
import { calculateLicenses } from '../../services/analysis/licenses.js';
import { makeRepository } from '../fixtures.js';

describe('calculateLicenses', () => {
  it('counts licenses and unlicensed repositories', () => {
    const repositories = [
      makeRepository({ id: 1, license: 'MIT' }),
      makeRepository({ id: 2, license: 'MIT' }),
      makeRepository({ id: 3, license: 'Apache-2.0' }),
      makeRepository({ id: 4, license: null }),
    ];

    expect(calculateLicenses(repositories)).toEqual({
      frequency: { MIT: 2, 'Apache-2.0': 1 },
      unlicensed: 1,
    });
  });

  it('reports all repositories as unlicensed when none declare a license', () => {
    const repositories = [makeRepository({ id: 1 }), makeRepository({ id: 2 })];

    expect(calculateLicenses(repositories)).toEqual({ frequency: {}, unlicensed: 2 });
  });
});
