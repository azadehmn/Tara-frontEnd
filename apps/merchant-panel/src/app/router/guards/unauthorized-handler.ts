import type { Router } from 'vue-router';
import { clearLoginSession, useAuthoritiesStore } from '@features/auth';
import { setUnauthorizedHandler } from '@shared/auth/unauthorized';

export function installUnauthorizedHandler(router: Router): void {
  setUnauthorizedHandler(() => {
    clearLoginSession();
    // remove permission state from pinia
    useAuthoritiesStore().reset();

    if (router.currentRoute.value.meta.guestOnly) return;

    void router.replace('/auth/login');
  });
}
