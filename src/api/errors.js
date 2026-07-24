/**
 * Deterministic categories for every failure the GitHub API layer can raise.
 * @readonly
 * @enum {string}
 */
export const GitHubErrorType = Object.freeze({
  NOT_FOUND: 'not_found',
  RATE_LIMIT: 'rate_limit',
  TIMEOUT: 'timeout',
  NETWORK: 'network',
  INVALID_JSON: 'invalid_json',
  UNKNOWN: 'unknown',
});

/**
 * Error raised for every failed GitHub API interaction. The `type` field lets
 * callers branch on the failure category without inspecting the message.
 */
export class GitHubError extends Error {
  /**
   * @param {string} type - One of {@link GitHubErrorType}.
   * @param {string} message - Human-readable description.
   * @param {{ status?: number | null, cause?: unknown }} [options]
   */
  constructor(type, message, options = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = 'GitHubError';
    this.type = type;
    this.status = options.status ?? null;
  }
}

/**
 * Map a non-OK HTTP response to a typed error.
 * @param {Response} response
 * @returns {GitHubError}
 */
export function errorFromResponse(response) {
  const { status } = response;

  if (status === 404) {
    return new GitHubError(GitHubErrorType.NOT_FOUND, 'The requested GitHub resource was not found.', { status });
  }

  if (status === 403 || status === 429) {
    return new GitHubError(GitHubErrorType.RATE_LIMIT, 'The GitHub API rate limit has been exceeded.', { status });
  }

  return new GitHubError(GitHubErrorType.UNKNOWN, `Unexpected GitHub API response (status ${status}).`, { status });
}

/**
 * Map a value thrown by the fetch pipeline to a typed error.
 * @param {unknown} error
 * @returns {GitHubError}
 */
export function errorFromException(error) {
  if (error instanceof GitHubError) {
    return error;
  }

  if (error?.name === 'AbortError') {
    return new GitHubError(GitHubErrorType.TIMEOUT, 'The GitHub API request timed out.', { cause: error });
  }

  if (error instanceof TypeError) {
    return new GitHubError(GitHubErrorType.NETWORK, 'Unable to reach the GitHub API.', { cause: error });
  }

  return new GitHubError(GitHubErrorType.UNKNOWN, 'An unexpected error occurred while contacting the GitHub API.', { cause: error });
}
