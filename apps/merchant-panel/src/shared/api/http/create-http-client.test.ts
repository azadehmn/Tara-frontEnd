import { afterEach, describe, expect, it, vi } from 'vitest';
import { createHttpClient } from './create-http-client';
import { setUnauthorizedHandler } from '@shared/auth/unauthorized';

describe('createHttpClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    setUnauthorizedHandler(undefined);
  });

  it('POSTs JSON to the service base path and returns the body', async function postJson() {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const client = createHttpClient({
      service: 'club',
      basePath: '/club/api/',
      origin: 'https://api.test',
    });

    const payload = await client.post<{ items: unknown[] }>('bo/contract/limited/v1/list', {
      page: { page: 0, size: 10 },
    });

    expect(payload.items).toEqual([]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://api.test/club/api/bo/contract/limited/v1/list');
    expect(init.method).toBe('POST');
  });

  it('normalizes a failed response into ApiError', async function failedResponse() {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ apierror: { message: 'no access' } }), { status: 403 }),
      ),
    );

    const client = createHttpClient({
      service: 'bnpl',
      basePath: '/bnpl/api/',
      origin: 'https://api.test',
    });

    await expect(client.get('v2/installment/panel/report')).rejects.toMatchObject({
      status: 403,
      message: 'no access',
    });
  });

  it('notifies unauthorized on 401 except credential login requests', async function unauthorized() {
    const onUnauthorized = vi.fn();
    setUnauthorizedHandler(onUnauthorized);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(() => Promise.resolve(new Response('{}', { status: 401 }))),
    );

    const client = createHttpClient({
      service: 'club',
      basePath: '/club/api/',
      origin: 'https://api.test',
    });

    await expect(client.get('bo/contract/limited/v1/list')).rejects.toMatchObject({ status: 401 });
    expect(onUnauthorized).toHaveBeenCalledTimes(1);

    onUnauthorized.mockClear();
    await expect(
      client.post('auth/user/panel/v1/login/backoffice', { principal: 'a', password: 'b' }),
    ).rejects.toMatchObject({ status: 401 });
    expect(onUnauthorized).not.toHaveBeenCalled();

    setUnauthorizedHandler(undefined);
  });
});
