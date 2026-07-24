import { describe, expect, it } from 'vitest';
import { GitHubError, GitHubErrorType, errorFromException, errorFromResponse } from '../api/errors.js';

describe('errorFromResponse', () => {
  it('maps 404 to a not-found error', () => {
    const error = errorFromResponse(new Response('', { status: 404 }));
    expect(error).toBeInstanceOf(GitHubError);
    expect(error.type).toBe(GitHubErrorType.NOT_FOUND);
    expect(error.status).toBe(404);
  });

  it('maps 403 and 429 to a rate-limit error', () => {
    expect(errorFromResponse(new Response('', { status: 403 })).type).toBe(GitHubErrorType.RATE_LIMIT);
    expect(errorFromResponse(new Response('', { status: 429 })).type).toBe(GitHubErrorType.RATE_LIMIT);
  });

  it('maps any other status to an unknown error', () => {
    const error = errorFromResponse(new Response('', { status: 500 }));
    expect(error.type).toBe(GitHubErrorType.UNKNOWN);
    expect(error.status).toBe(500);
  });
});

describe('errorFromException', () => {
  it('maps an abort to a timeout error', () => {
    const error = errorFromException(new DOMException('Aborted', 'AbortError'));
    expect(error.type).toBe(GitHubErrorType.TIMEOUT);
  });

  it('maps a TypeError to a network error', () => {
    expect(errorFromException(new TypeError('Failed to fetch')).type).toBe(GitHubErrorType.NETWORK);
  });

  it('passes an existing GitHubError through unchanged', () => {
    const original = new GitHubError(GitHubErrorType.NOT_FOUND, 'missing');
    expect(errorFromException(original)).toBe(original);
  });

  it('falls back to an unknown error', () => {
    expect(errorFromException(new Error('unexpected')).type).toBe(GitHubErrorType.UNKNOWN);
  });
});
