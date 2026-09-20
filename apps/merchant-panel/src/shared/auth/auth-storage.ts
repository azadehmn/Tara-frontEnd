import { clearTokens } from './tokens';

/*--------------------------------------------------------------------------------
   Login / OTP success
      ↓
  saveUserId(userId)
        ↓
  localStorage.merchant_user_id

  Page refresh
        ↓
  getUserId()
        ↓
  fetch authorities
 -------------------------------------------------------------------------------- */
const USER_ID_KEY = 'merchant_user_id';

export function saveUserId(userId: number | string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(USER_ID_KEY, String(userId));
}

export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(USER_ID_KEY);
}

export function clearUserId(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(USER_ID_KEY);
}

export function clearAuthStorage(): void {
  clearTokens();
  clearUserId();
}
