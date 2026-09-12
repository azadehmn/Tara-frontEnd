import { describe, expect, it } from 'vitest';
import { extractErrorMessage, normalizeError } from './normalize-error';

describe('extractErrorMessage', () => {
  it('prefers nested data.message over empty root message', () => {
    expect(
      extractErrorMessage({
        data: { code: 2014, message: 'کیف پول فعال نشده است' },
        success: false,
        message: '',
      }),
    ).toBe('کیف پول فعال نشده است');
  });

  it('ignores empty Spring message so callers can use code', () => {
    expect(
      extractErrorMessage({
        status: 401,
        error: 'Unauthorized',
        message: '',
        path: '/club/api/bo/contract/limited/v1/list',
      }),
    ).toBeUndefined();
  });

  it('reads apierror.message', () => {
    expect(extractErrorMessage({ apierror: { message: 'bnpl failed' } })).toBe('bnpl failed');
  });
});

describe('normalizeError', () => {
  it('maps 401 with empty message to UNAUTHORIZED and a usable text', () => {
    const error = normalizeError({
      service: 'club',
      status: 401,
      payload: {
        timestamp: '2026-09-12T12:55:23.046+00:00',
        status: 401,
        error: 'Unauthorized',
        message: '',
        path: '/club/api/bo/contract/limited/v1/list',
      },
    });

    expect(error.code).toBe('UNAUTHORIZED');
    expect(error.message).toBe('بروز خطا، لطفا دوباره امتحان کنید');
    expect(error.status).toBe(401);
  });

  it('maps business payload message and numeric code', () => {
    const error = normalizeError({
      service: 'club',
      status: 400,
      payload: {
        data: { code: 2014, message: 'کیف پول فعال نشده است' },
        success: false,
      },
    });

    expect(error.message).toBe('کیف پول فعال نشده است');
    expect(error.code).toBe('2014');
  });

  it('marks fetch TypeError as a network error', () => {
    const error = normalizeError({
      service: 'bnpl',
      cause: new TypeError('Failed to fetch'),
    });

    expect(error.isNetworkError).toBe(true);
    expect(error.code).toBe('NETWORK');
  });
});
