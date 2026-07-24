import { GitHubError, GitHubErrorType, errorFromException, errorFromResponse } from './errors.js';

const DEFAULT_TIMEOUT_MS = 10_000;

const DEFAULT_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

/**
 * Perform a GET request against the GitHub REST API and return its parsed JSON
 * body. Applies a timeout, honors an optional external abort signal, validates
 * the response status, and normalizes every failure into a {@link GitHubError}.
 *
 * @param {string} url - Absolute GitHub API URL.
 * @param {{ timeout?: number, signal?: AbortSignal }} [options]
 * @returns {Promise<unknown>}
 */
export async function requestJson(url, { timeout = DEFAULT_TIMEOUT_MS, signal } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const forwardAbort = () => controller.abort();

  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener('abort', forwardAbort, { once: true });
  }

  let response;
  try {
    response = await fetch(url, { headers: DEFAULT_HEADERS, signal: controller.signal });
  } catch (error) {
    // A caller-initiated cancellation propagates untouched so React Query can
    // recognize it; only the internal timeout is normalized to a typed error.
    if (signal?.aborted) throw error;
    throw errorFromException(error);
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener('abort', forwardAbort);
  }

  if (!response.ok) {
    throw errorFromResponse(response);
  }

  try {
    return await response.json();
  } catch (error) {
    throw new GitHubError(GitHubErrorType.INVALID_JSON, 'The GitHub API returned a malformed response.', { cause: error });
  }
}
