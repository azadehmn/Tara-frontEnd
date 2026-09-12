import type { ApiServiceName } from '@app/config/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpResponseType = 'json' | 'blob' | 'text' | 'void';

export type QueryValue = string | number | boolean | null | undefined;

export interface HttpRequestConfig {
  path: string;
  method?: HttpMethod;
  query?: Record<string, QueryValue>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
  responseType?: HttpResponseType;
}

export interface HttpRequestContext {
  url: string;
  headers: Headers;
  config: HttpRequestConfig;
  service: ApiServiceName;
}

export type RequestInterceptor = (context: HttpRequestContext) => void | Promise<void>;
// ----------------------------------------------------------
//* Client  Instance For Example Not Request
// createHttpClient({
//   service: 'club',
//   basePath: '/club/api/',
//   timeoutMs: 20_000,
// });
//*
// ----------------------------------------------------------

export interface CreateHttpClientOptions {
  service: ApiServiceName;
  basePath: string;
  origin?: string;
  requestInterceptors?: RequestInterceptor[];
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
}
// ----------------------------------------------------------
//*
// PUBLIC CONTRACT
//*
// ----------------------------------------------------------

export interface HttpClient {
  readonly service: ApiServiceName;
  request<T>(config: HttpRequestConfig): Promise<T>;
  get<T>(path: string, config?: Omit<HttpRequestConfig, 'path' | 'method' | 'body'>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, 'path' | 'method' | 'body'>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, 'path' | 'method' | 'body'>,
  ): Promise<T>;
  patch<T>(
    path: string,
    body?: unknown,
    config?: Omit<HttpRequestConfig, 'path' | 'method' | 'body'>,
  ): Promise<T>;
  delete<T>(path: string, config?: Omit<HttpRequestConfig, 'path' | 'method' | 'body'>): Promise<T>;
}
