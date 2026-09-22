import type { RouteLocationNormalized, Router } from 'vue-router';
import { hasOtpChallenge, useAuthoritiesStore } from '@features/auth';
import { hasAccessToken } from '@shared/auth/tokens';

export const DEFAULT_AUTHED_ROUTE = '/dashboard';
const LOGIN_ROUTE = '/auth/login';

/**Check whether the route or any parent route has the given meta flag.*/
function hasMeta(
  to: RouteLocationNormalized,
  key: 'requiresAuth' | 'guestOnly' | 'requiresOtpChallenge',
): boolean {
  return to.matched.some((record) => record.meta[key] === true);
}

/** Use the nearest route permission, starting from the child route.*/
function requiredPermission(to: RouteLocationNormalized): string | string[] | undefined {
  const permission = [...to.matched].reverse().find((record) => record.meta.permission)
    ?.meta.permission;
  if (typeof permission === 'string' || Array.isArray(permission)) return permission;
  return undefined;
}

export async function authRouteMiddleware(to: RouteLocationNormalized) {
  const authenticated = hasAccessToken();
  const otpChallenge = hasOtpChallenge();

  /** Allow OTP only for an active challenge; otherwise redirect based on auth state.*/
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
  /**-------------------------------------------------- 
    requiresAuth
      ↓
    OTP pending? → OTP
      ↓
    No token? → Login
      ↓
    Load authorities
      ↓
    Check permission
      ↓
    Allowed → continue
    Denied → /
-----------------------------------------------------*/

  if (hasMeta(to, 'requiresAuth')) {
    if (otpChallenge) return { name: 'otp', replace: true };
    if (!authenticated) return { path: LOGIN_ROUTE, replace: true };

    const authorities = useAuthoritiesStore();
    if (!authorities.loaded) await authorities.fetch();

    const permission = requiredPermission(to);
    // `/` is the forbidden-route fallback until a dedicated no-access page exists.
    if (
      permission !== undefined &&
      !authorities.hasAny(permission) &&
      to.path !== DEFAULT_AUTHED_ROUTE
    ) {
      return { path: DEFAULT_AUTHED_ROUTE, replace: true };
    }
  }
}
/** Attach the auth middleware to run before each navigation.*/
export function installAuthGuard(router: Router): void {
  router.beforeEach((to) => authRouteMiddleware(to));
}
