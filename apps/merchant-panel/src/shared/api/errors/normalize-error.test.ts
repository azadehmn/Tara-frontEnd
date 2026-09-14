import { describe, expect, it } from 'vitest';
import { normalizeError } from './normalize-error';

describe('normalizeError', () => {
  it('reads nested data.message', () => {
    const error = normalizeError({
      payload: { data: { code: 2014, message: 'کیف پول فعال نشده است' }, success: false },
    });

    expect(error.message).toBe('کیف پول فعال نشده است');
  });

  it('falls back when Spring 401 message is empty', () => {
    const error = normalizeError({
      status: 401,
      payload: { status: 401, error: 'Unauthorized', message: '' },
    });

    expect(error.message).toBe('بروز خطا، لطفا دوباره امتحان کنید');
    expect(error.status).toBe(401);
  });

  it('reads apierror.message', () => {
    const error = normalizeError({
      payload: { apierror: { message: 'bnpl failed' } },
    });

    expect(error.message).toBe('bnpl failed');
  });

  it('maps fetch TypeError to a network message', () => {
    const error = normalizeError({ cause: new TypeError('Failed to fetch') });

    expect(error.message).toBe('ارتباط با سرور برقرار نشد');
  });
});
