import type { QueryValue } from './types';

export function joinUrl(origin: string, basePath: string, path: string): string {
  const normalizedPath = path.replace(/^\/+/, '');
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;

  if (!origin) {
    return `${normalizedBase}${normalizedPath}`;
  }

  return `${origin.replace(/\/+$/, '')}${normalizedBase}${normalizedPath}`;
}

export function withQuery(url: string, query?: Record<string, QueryValue>): string {
  if (!query) return url;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined || value === '') continue;
    params.set(key, String(value));
  }

  const serialized = params.toString();
  if (!serialized) return url;
  return `${url}${url.includes('?') ? '&' : '?'}${serialized}`;
}
