import { describe, expect, it } from 'vitest';
import {
  calculateForks,
  calculateOpenIssues,
  calculateStars,
  calculateWatchers,
} from '../../services/analysis/engagement.js';
import { makeRepository } from '../fixtures.js';

describe('calculateStars', () => {
  it('handles no repositories', () => {
    expect(calculateStars([])).toEqual({ total: 0, mostStarred: null });
  });

  it('totals stars and finds the most starred repository', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'a', stargazersCount: 3 }),
      makeRepository({ id: 2, name: 'b', stargazersCount: 10 }),
    ];
    const result = calculateStars(repositories);

    expect(result.total).toBe(13);
    expect(result.mostStarred.name).toBe('b');
  });

  it('still names a most starred repository when every count is zero', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'a' }),
      makeRepository({ id: 2, name: 'b' }),
    ];
    const result = calculateStars(repositories);

    expect(result.total).toBe(0);
    expect(result.mostStarred.name).toBe('a');
  });

  it('breaks ties in favor of the earliest repository', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'a', stargazersCount: 5 }),
      makeRepository({ id: 2, name: 'b', stargazersCount: 5 }),
    ];

    expect(calculateStars(repositories).mostStarred.name).toBe('a');
  });
});

describe('calculateForks', () => {
  it('totals forks and finds the most forked repository', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'a', forksCount: 2 }),
      makeRepository({ id: 2, name: 'b', forksCount: 7 }),
    ];
    const result = calculateForks(repositories);

    expect(result.total).toBe(9);
    expect(result.mostForked.name).toBe('b');
  });
});

describe('calculateWatchers / calculateOpenIssues', () => {
  it('sum their respective totals', () => {
    const repositories = [
      makeRepository({ id: 1, watchersCount: 4, openIssuesCount: 1 }),
      makeRepository({ id: 2, watchersCount: 6, openIssuesCount: 2 }),
    ];

    expect(calculateWatchers(repositories)).toBe(10);
    expect(calculateOpenIssues(repositories)).toBe(3);
  });
});
