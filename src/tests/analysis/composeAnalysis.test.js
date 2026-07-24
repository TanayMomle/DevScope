import { describe, expect, it } from 'vitest';
import { composeAnalysis } from '../../services/analysis/composeAnalysis.js';
import { makeRepository, makeUser } from '../fixtures.js';

const NOW = new Date('2026-01-01T00:00:00Z');

describe('composeAnalysis', () => {
  it('produces an empty-but-complete result for no repositories', () => {
    const result = composeAnalysis(makeUser({ login: 'octocat' }), [], { now: NOW });

    expect(result.username).toBe('octocat');
    expect(result.counts.total).toBe(0);
    expect(result.stars).toEqual({ total: 0, mostStarred: null });
    expect(result.languages).toEqual({ distribution: {}, top: [] });
    expect(result.age).toEqual({ oldest: null, newest: null, averageAgeDays: 0 });
    expect(result.activity).toEqual({ lastActivityAt: null, repository: null });
  });

  it('summarizes a single repository', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'solo', language: 'Go', stargazersCount: 5, size: 200 }),
    ];
    const result = composeAnalysis(makeUser(), repositories, { now: NOW });

    expect(result.counts.total).toBe(1);
    expect(result.stars.total).toBe(5);
    expect(result.stars.mostStarred.name).toBe('solo');
    expect(result.languages.top).toEqual([{ name: 'Go', count: 1 }]);
    expect(result.sizes.total).toBe(200);
  });

  it('composes analytics across multiple repositories', () => {
    const repositories = [
      makeRepository({ id: 1, name: 'a', language: 'JavaScript', stargazersCount: 10, forksCount: 1, size: 100 }),
      makeRepository({ id: 2, name: 'b', language: 'JavaScript', stargazersCount: 2, forksCount: 8, size: 400, fork: true }),
      makeRepository({ id: 3, name: 'c', language: 'Rust', stargazersCount: 6, forksCount: 3, size: 250, archived: true }),
    ];
    const result = composeAnalysis(makeUser(), repositories, { now: NOW });

    expect(result.counts).toMatchObject({ total: 3, original: 2, forked: 1, archived: 1 });
    expect(result.stars.total).toBe(18);
    expect(result.stars.mostStarred.name).toBe('a');
    expect(result.forks.mostForked.name).toBe('b');
    expect(result.languages.top[0]).toEqual({ name: 'JavaScript', count: 2 });
    expect(result.sizes.largest.name).toBe('b');
    expect(result.sizes.smallest.name).toBe('a');
  });

  it('returns a deeply frozen, immutable result', () => {
    const result = composeAnalysis(makeUser(), [makeRepository({ id: 1 })], { now: NOW });

    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.counts)).toBe(true);
    expect(Object.isFrozen(result.counts.visibility)).toBe(true);
    expect(() => {
      result.counts.total = 999;
    }).toThrow();
  });

  it('does not mutate or freeze the input repositories', () => {
    const repositories = [makeRepository({ id: 1 })];
    composeAnalysis(makeUser(), repositories, { now: NOW });

    expect(Object.isFrozen(repositories[0])).toBe(false);
  });
});
