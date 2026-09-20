import type { RouteLocationNormalized, Router } from 'vue-router';
import { hasOtpChallenge } from '@features/auth';
import { hasAccessToken } from '@shared/auth/token-storage';

export const DEFAULT_AUTHED_ROUTE = '/';
const LOGIN_ROUTE = '/auth/login';

function hasMeta(
  to: RouteLocationNormalized,
  key: 'requiresAuth' | 'guestOnly' | 'requiresOtpChallenge',
): boolean {
  return to.matched.some((record) => record.meta[key] === true);
}

export function authRouteMiddleware(to: RouteLocationNormalized) {
  const authenticated = hasAccessToken();
  const otpChallenge = hasOtpChallenge();

  if (hasMeta(to, 'requiresOtpChallenge')) {
    if (otpChallenge) return;
    return authenticated
      ? { path: DEFAULT_AUTHED_ROUTE, replace: true }
      : { path: LOGIN_ROUTE, replace: true };
  }

  if (hasMeta(to, 'guestOnly')) {
    if (otpChallenge) return { name: 'otp', replace: true };
    if (authenticated) return { path: DEFAULT_AUTHED_ROUTE, replace: true };
    if ('redirect' in to.query) return { path: LOGIN_ROUTE, replace: true };
    return;
  }

  if (hasMeta(to, 'requiresAuth')) {
    if (otpChallenge) return { name: 'otp', replace: true };
    if (authenticated) return;
    return { path: LOGIN_ROUTE, replace: true };
  }
}

export function installAuthGuard(router: Router): void {
  router.beforeEach((to) => authRouteMiddleware(to));
}
