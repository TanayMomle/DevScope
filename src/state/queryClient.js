import { QueryClient } from '@tanstack/react-query';
import { GitHubError, GitHubErrorType } from '../api/errors.js';

const MAX_RETRIES = 2;

const RETRYABLE_ERRORS = new Set([GitHubErrorType.NETWORK, GitHubErrorType.TIMEOUT]);

/**
 * Retry only transient failures (network, timeout), and only up to MAX_RETRIES.
 * Deterministic errors — not found, rate limit, malformed responses — and any
 * non-GitHub error are never retried.
 *
 * @param {number} failureCount
 * @param {unknown} error
 * @returns {boolean}
 */
export function shouldRetry(failureCount, error) {
  if (error instanceof GitHubError && RETRYABLE_ERRORS.has(error.type)) {
    return failureCount < MAX_RETRIES;
  }
  return false;
}

/**
 * Create the application's QueryClient with a deterministic retry policy.
 * @returns {QueryClient}
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: shouldRetry,
        refetchOnWindowFocus: false,
      },
    },
  });
}
