import { describe, expect, it } from 'vitest';
import { getRepositories, getUser } from '../api/endpoints.js';

describe('endpoints', () => {
  it('builds the user URL', () => {
    expect(getUser('octocat')).toBe('https://api.github.com/users/octocat');
  });

  it('builds a paginated repositories URL', () => {
    expect(getRepositories('octocat')).toBe(
      'https://api.github.com/users/octocat/repos?per_page=100&page=1',
    );
    expect(getRepositories('octocat', { page: 3, perPage: 50 })).toBe(
      'https://api.github.com/users/octocat/repos?per_page=50&page=3',
    );
  });

  it('encodes path segments', () => {
    expect(getUser('a b')).toBe('https://api.github.com/users/a%20b');
    expect(getRepositories('a b')).toBe(
      'https://api.github.com/users/a%20b/repos?per_page=100&page=1',
    );
  });
});
