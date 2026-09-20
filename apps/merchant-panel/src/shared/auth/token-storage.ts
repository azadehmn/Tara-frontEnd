const ACCESS_TOKEN_KEY = 'id_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

let pendingAccessToken: string | null = null;
let pendingRefreshToken: string | null = null;

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAccessTokenForRequest(): string | null {
  return getAccessToken() ?? pendingAccessToken;
}

export function hasAccessToken(): boolean {
  return Boolean(getAccessToken()?.trim());
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(REFRESH_TOKEN_KEY) ?? pendingRefreshToken;
}

export function setPendingTokens(accessToken: string, refreshToken?: string): void {
  pendingAccessToken = accessToken;
  pendingRefreshToken = refreshToken ?? null;
}

export function saveTokens(accessToken: string, refreshToken?: string): void {
  pendingAccessToken = null;
  pendingRefreshToken = null;
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  else window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function persistPendingTokens(): void {
  if (!pendingAccessToken) return;
  saveTokens(pendingAccessToken, pendingRefreshToken ?? undefined);
}

export function clearTokens(): void {
  pendingAccessToken = null;
  pendingRefreshToken = null;
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
