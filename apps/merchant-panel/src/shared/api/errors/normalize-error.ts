import { ApiError } from './api-error';

const FALLBACK = 'بروز خطا، لطفا دوباره امتحان کنید';

export function normalizeError(input: {
  status?: number;
  payload?: unknown;
  cause?: unknown;
}): ApiError {
  if (input.cause instanceof ApiError) return input.cause;

  if (input.cause instanceof TypeError) {
    return new ApiError('ارتباط با سرور برقرار نشد');
  }

  const body = asObject(input.payload);
  const nested = asObject(body?.data);
  const raw = nested?.message ?? body?.message ?? asObject(body?.apierror)?.message;
  const message = typeof raw === 'string' && raw.trim() ? raw.trim() : FALLBACK;

  return new ApiError(message, input.status ?? 0);
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
