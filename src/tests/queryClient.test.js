import { describe, expect, it } from 'vitest';
import { shouldRetry } from '../state/queryClient.js';
import { GitHubError, GitHubErrorType } from '../api/errors.js';

const error = (type) => new GitHubError(type, type);

describe('shouldRetry', () => {
  it('retries transient network and timeout errors up to twice', () => {
    expect(shouldRetry(0, error(GitHubErrorType.NETWORK))).toBe(true);
    expect(shouldRetry(1, error(GitHubErrorType.TIMEOUT))).toBe(true);
    expect(shouldRetry(2, error(GitHubErrorType.NETWORK))).toBe(false);
  });

  it('never retries deterministic errors', () => {
    expect(shouldRetry(0, error(GitHubErrorType.NOT_FOUND))).toBe(false);
    expect(shouldRetry(0, error(GitHubErrorType.RATE_LIMIT))).toBe(false);
    expect(shouldRetry(0, error(GitHubErrorType.INVALID_JSON))).toBe(false);
  });

  it('never retries non-GitHub errors', () => {
    expect(shouldRetry(0, new Error('boom'))).toBe(false);
  });
});
