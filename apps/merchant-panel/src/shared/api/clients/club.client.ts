import { API_BASE_PATHS, type ClubApiVersion } from '@app/config/api';
import { createHttpClient } from '../http/create-http-client';
import type { HttpClient, HttpRequestConfig } from '../http/types';

type ClubRequestConfig = HttpRequestConfig & { version?: ClubApiVersion };
type ClubCallConfig = Omit<HttpRequestConfig, 'path' | 'method' | 'body'> & {
  version?: ClubApiVersion;
};

export interface ClubClient {
  request<T>(config: ClubRequestConfig): Promise<T>;
  get<T>(path: string, config?: ClubCallConfig): Promise<T>;
  post<T>(path: string, body?: unknown, config?: ClubCallConfig): Promise<T>;
  put<T>(path: string, body?: unknown, config?: ClubCallConfig): Promise<T>;
  patch<T>(path: string, body?: unknown, config?: ClubCallConfig): Promise<T>;
  delete<T>(path: string, config?: ClubCallConfig): Promise<T>;
}

const defaultClient = createHttpClient({
  service: 'club',
  basePath: API_BASE_PATHS.club.default,
});

const v1Client = createHttpClient({
  service: 'club',
  basePath: API_BASE_PATHS.club.v1,
});

function pick(version: ClubApiVersion = 'default'): HttpClient {
  return version === 'v1' ? v1Client : defaultClient;
}

/** Single Club service boundary with two path versions. */
export const clubClient: ClubClient = {
  request: ({ version, ...config }) => pick(version).request(config),
  get: (path, config) => {
    const { version, ...requestConfig } = config ?? {};
    return pick(version).get(path, requestConfig);
  },
  post: (path, body, config) => {
    const { version, ...requestConfig } = config ?? {};
    return pick(version).post(path, body, requestConfig);
  },
  put: (path, body, config) => {
    const { version, ...requestConfig } = config ?? {};
    return pick(version).put(path, body, requestConfig);
  },
  patch: (path, body, config) => {
    const { version, ...requestConfig } = config ?? {};
    return pick(version).patch(path, body, requestConfig);
  },
  delete: (path, config) => {
    const { version, ...requestConfig } = config ?? {};
    return pick(version).delete(path, requestConfig);
  },
};
