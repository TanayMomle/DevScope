import { afterEach, describe, expect, it, vi } from 'vitest';
import { requestJson } from '../api/githubClient.js';
import { GitHubErrorType } from '../api/errors.js';

const jsonResponse = (body) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('requestJson', () => {
  it('returns parsed JSON for a successful response', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => jsonResponse({ login: 'octocat' })));
    await expect(requestJson('https://api.github.com/users/octocat')).resolves.toEqual({
      login: 'octocat',
    });
  });

  it('sends the GitHub content negotiation headers', async () => {
    const fetchMock = vi.fn(async () => jsonResponse({}));
    vi.stubGlobal('fetch', fetchMock);

    await requestJson('https://api.github.com/users/octocat');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.github.com/users/octocat',
      expect.objectContaining({
        headers: expect.objectContaining({ Accept: 'application/vnd.github+json' }),
      }),
    );
  });

  it('maps a 404 response to a not-found error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 404 })));
    await expect(requestJson('https://api.github.com/users/ghost')).rejects.toMatchObject({
      type: GitHubErrorType.NOT_FOUND,
    });
  });

  it('maps a network failure to a network error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      throw new TypeError('Failed to fetch');
    }));
    await expect(requestJson('https://api.github.com/users/octocat')).rejects.toMatchObject({
      type: GitHubErrorType.NETWORK,
    });
  });

  it('maps malformed JSON to an invalid-json error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<<not json>>', { status: 200 })));
    await expect(requestJson('https://api.github.com/users/octocat')).rejects.toMatchObject({
      type: GitHubErrorType.INVALID_JSON,
    });
  });

  it('aborts and maps to a timeout error when the request is too slow', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () =>
              reject(new DOMException('The operation was aborted.', 'AbortError')),
            );
          }),
      ),
    );

    const pending = requestJson('https://api.github.com/users/octocat', { timeout: 1000 });
    const assertion = expect(pending).rejects.toMatchObject({ type: GitHubErrorType.TIMEOUT });
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
  });

  it('propagates a caller-initiated cancellation without wrapping it', async () => {
    const controller = new AbortController();
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () =>
              reject(new DOMException('Aborted', 'AbortError')),
            );
          }),
      ),
    );

    const pending = requestJson('https://api.github.com/users/octocat', {
      signal: controller.signal,
    });
    controller.abort();

    await expect(pending).rejects.toMatchObject({ name: 'AbortError' });
  });
});
