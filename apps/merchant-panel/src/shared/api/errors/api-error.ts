export class ApiError extends Error {
  readonly status: number;
  readonly service?: string;
  readonly code?: string;
  readonly details: unknown;
  readonly isNetworkError: boolean;

  constructor(input: {
    message: string;
    status?: number;
    service?: string;
    code?: string;
    details?: unknown;
    isNetworkError?: boolean;
    cause?: unknown;
  }) {
    super(input.message, { cause: input.cause });
    this.name = 'ApiError';
    this.status = input.status ?? 0;
    this.service = input.service;
    this.code = input.code;
    this.details = input.details;
    this.isNetworkError = input.isNetworkError ?? false;
  }
}
