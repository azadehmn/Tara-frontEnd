import { ApiError } from './api-error';

const FALLBACK = 'بروز خطا، لطفا دوباره امتحان کنید';

export function normalizeError(input: {
  status?: number;
  payload?: unknown;
  cause?: unknown;
  service?: string;
}): ApiError {
  if (input.cause instanceof ApiError) return input.cause;

  if (input.cause instanceof TypeError) {
    return new ApiError({
      message: 'ارتباط با سرور برقرار نشد',
      isNetworkError: true,
      cause: input.cause,
    });
  }

  const body = asObject(input.payload);
  const nested = asObject(body?.data);
  const rawMessage = nested?.message ?? body?.message ?? asObject(body?.apierror)?.message;
  const message = typeof rawMessage === 'string' && rawMessage.trim() ? rawMessage.trim() : FALLBACK;

  const rawCode = nested?.code ?? body?.code;
  let code: string | undefined;
  if (rawCode !== undefined && rawCode !== null && rawCode !== '') {
    code = String(rawCode);
  } else if (input.status === 401) {
    code = 'UNAUTHORIZED';
  } else if (input.status === 403) {
    code = 'FORBIDDEN';
  }

  return new ApiError({
    message,
    status: input.status ?? 0,
    service: input.service,
    code,
    details: input.payload,
    cause: input.cause,
  });
}

function asObject(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
