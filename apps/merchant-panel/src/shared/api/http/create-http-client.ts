/**----------------------------------------------------------

createHttpClient
       │
       ├── URL construction
       ├── headers
       ├── request interceptors
       ├── body serialization
       ├── timeout
       ├── cancellation
       ├── fetch
       ├── response parsing
       └── error normalization
 ---------------------------------------------------------- */

import { ApiError } from '../errors/api-error';
import { normalizeError } from '../errors/normalize-error';
import { applyAuthHeader } from './interceptors/auth.interceptor';
import { joinUrl, withQuery } from './join-url';

import type { CreateHttpClientOptions, HttpClient, HttpRequestConfig } from './types';

const DEFAULT_TIMEOUT_MS = 30_000;

export function createHttpClient(options: CreateHttpClientOptions): HttpClient {
  const origin = options.origin ?? '';
  const interceptors = [applyAuthHeader, ...(options.requestInterceptors ?? [])];
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  async function request<T>(config: HttpRequestConfig): Promise<T> {
    const url = withQuery(joinUrl(origin, options.basePath, config.path), config.query);
    const headers = new Headers({
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.defaultHeaders,
      ...config.headers,
    });

    for (const interceptor of interceptors) {
      await interceptor({ url, headers, config, service: options.service });
    }

    const body = serializeBody(config.body, headers);
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(() => controller.abort(), config.timeoutMs ?? timeoutMs);
    // Cancel the request if the caller cancels it or the request times out.
    const signal = mergeSignals(config.signal, controller.signal);

    try {
      const response = await fetch(url, {
        method: config.method ?? 'GET',
        headers,
        body,
        signal,
      });

      if (!response.ok) {
        const payload = await readErrorPayload(response);
        throw normalizeError({
          status: response.status,
          payload,
        });
      }

      return (await parseSuccess<T>(response, config.responseType ?? 'json')) as T;
    } catch (cause) {
      if (cause instanceof ApiError) throw cause;
      throw normalizeError({ cause });
    } finally {
      globalThis.clearTimeout(timeout);
    }
  }

  return {
    service: options.service,
    request,
    get: (path, config) => request({ ...config, path, method: 'GET' }),
    post: (path, body, config) => request({ ...config, path, method: 'POST', body }),
    put: (path, body, config) => request({ ...config, path, method: 'PUT', body }),
    patch: (path, body, config) => request({ ...config, path, method: 'PATCH', body }),
    delete: (path, config) => request({ ...config, path, method: 'DELETE' }),
  };
}

function serializeBody(body: unknown, headers: Headers): BodyInit | undefined {
  if (body === undefined || body === null) return undefined;
  /**----------------------------------------------------------
  // Let the browser handle the body and Content-Type for FormData, Blob, and URLSearchParams.
  ---------------------------------------------------------- */
  if (body instanceof FormData || body instanceof Blob || body instanceof URLSearchParams) {
    headers.delete('Content-Type');
    return body;
  }
  if (typeof body === 'string') return body;
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  return JSON.stringify(body);
}

async function parseSuccess<T>(
  response: Response,
  responseType: NonNullable<HttpRequestConfig['responseType']>,
): Promise<T | undefined> {
  if (responseType === 'void' || response.status === 204) return undefined;
  if (responseType === 'blob') return (await response.blob()) as T;
  if (responseType === 'text') return (await response.text()) as T;

  const text = await response.text();
  if (!text) return undefined;
  return JSON.parse(text) as T;
}

async function readErrorPayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function mergeSignals(
  userSignal: AbortSignal | undefined,
  timeoutSignal: AbortSignal,
): AbortSignal {
  if (!userSignal) return timeoutSignal;

  return AbortSignal.any([userSignal, timeoutSignal]);
}
