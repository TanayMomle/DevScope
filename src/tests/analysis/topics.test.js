import { describe, expect, it } from 'vitest';
import { calculateTopics } from '../../services/analysis/topics.js';
import { makeRepository } from '../fixtures.js';

describe('calculateTopics', () => {
  it('handles repositories with no topics', () => {
    const repositories = [makeRepository({ id: 1, topics: [] }), makeRepository({ id: 2, topics: undefined })];

    expect(calculateTopics(repositories)).toEqual({ frequency: {}, top: [] });
  });

  it('counts topic frequency across repositories', () => {
    const repositories = [
      makeRepository({ id: 1, topics: ['cli', 'react'] }),
      makeRepository({ id: 2, topics: ['react'] }),
    ];
    const result = calculateTopics(repositories);

    expect(result.frequency).toEqual({ cli: 1, react: 2 });
    expect(result.top).toEqual([
      { name: 'react', count: 2 },
      { name: 'cli', count: 1 },
    ]);
  });
});
