import type { Router } from 'vue-router';
import { clearLoginSession } from '@features/auth';
import { clearTokens } from '@shared/auth/token-storage';
import { setUnauthorizedHandler } from '@shared/auth/unauthorized';

export function installUnauthorizedHandler(router: Router): void {
  setUnauthorizedHandler(() => {
    clearTokens();
    clearLoginSession();
    // Clear auth data on 401 and redirect to login unless the current route is guest-only.
    if (router.currentRoute.value.matched.some((record) => record.meta.guestOnly)) {
      return;
    }
    void router.replace({ path: '/auth/login' });
  });
}
