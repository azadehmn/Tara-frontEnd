import type { Router } from 'vue-router';
import { clearLoginSession } from '@features/auth';
import { setUnauthorizedHandler } from '@shared/auth/unauthorized';

export function installUnauthorizedHandler(router: Router): void {
  setUnauthorizedHandler(() => {
    clearLoginSession();

    if (router.currentRoute.value.meta.guestOnly) return;

    void router.replace('/auth/login');
  });
}
