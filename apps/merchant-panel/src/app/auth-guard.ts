import type { Router } from 'vue-router';
import { loginSession } from '@features/auth';
import { hasAccessToken } from '@shared/auth/token-storage';
import { setUnauthorizedHandler } from '@shared/auth/unauthorized';

export function installAuthGuard(router: Router): void {
  router.beforeEach((to) => {
    const authenticated = hasAccessToken();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const pendingTwoFactor = Boolean(loginSession.login?.twofactorActive);

    if (requiresAuth && !authenticated) {
      return { name: 'login' };
    }

    if (to.name === 'login' && authenticated) {
      return { name: pendingTwoFactor ? 'otp' : 'dashboard' };
    }

    if (to.name === 'otp' && !authenticated) {
      return { name: 'login' };
    }

    if (to.name === 'otp' && authenticated && !pendingTwoFactor) {
      return { name: 'dashboard' };
    }
  });
}

export function installUnauthorizedHandler(router: Router): void {
  setUnauthorizedHandler(() => {
    loginSession.login = null;
    loginSession.authorities = null;
    if (router.currentRoute.value.name === 'login') return;
    void router.replace({ name: 'login' });
  });
}
