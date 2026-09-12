import { ApiError } from './api-error';

const FALLBACK_MESSAGE = 'بروز خطا، لطفا دوباره امتحان کنید';

export function normalizeError(input: {
  service?: string;
  status?: number;
  payload?: unknown;
  cause?: unknown;
  url?: string;
}): ApiError {
  if (input.cause instanceof ApiError) return input.cause;

  if (isAbortError(input.cause)) {
    return new ApiError({
      message: FALLBACK_MESSAGE,
      status: 0,
      service: input.service,
      code: 'TIMEOUT',
      isNetworkError: true,
      cause: input.cause,
    });
  }

  if (input.cause instanceof TypeError) {
    return new ApiError({
      message: 'ارتباط با سرور برقرار نشد',
      status: 0,
      service: input.service,
      code: 'NETWORK',
      isNetworkError: true,
      cause: input.cause,
    });
  }

  return new ApiError({
    message: pickMessage(input.payload) ?? FALLBACK_MESSAGE,
    status: input.status ?? 0,
    service: input.service,
    code: pickCode(input.payload, input.status),
    details: input.payload,
    cause: input.cause,
  });
}

export function extractErrorMessage(payload: unknown): string | undefined {
  return pickMessage(payload);
}

function pickMessage(payload: unknown): string | undefined {
  if (typeof payload === 'string') return asNonEmptyString(payload);
  const root = asRecord(payload);
  if (!root) return undefined;

  return (
    asNonEmptyString(asRecord(root.data)?.message) ??
    asNonEmptyString(root.message) ??
    asNonEmptyString(asRecord(root.apierror)?.message) ??
    firstMessage(asRecord(root.status)?.message)
  );
}

function pickCode(payload: unknown, status?: number): string | undefined {
  const root = asRecord(payload);
  const nestedCode = asRecord(root?.data)?.code ?? root?.code;
  if (typeof nestedCode === 'number' || typeof nestedCode === 'string') {
    return String(nestedCode);
  }

  if (status === 401) return 'UNAUTHORIZED';
  if (status === 403) return 'FORBIDDEN';
  return undefined;
}

function firstMessage(value: unknown): string | undefined {
  if (Array.isArray(value)) return asNonEmptyString(value[0]);
  return asNonEmptyString(value);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function isAbortError(cause: unknown): boolean {
  return cause instanceof DOMException && cause.name === 'AbortError';
}
