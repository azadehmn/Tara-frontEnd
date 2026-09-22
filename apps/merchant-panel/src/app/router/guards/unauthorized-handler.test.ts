import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearLoginSession, loginSession, useAuthoritiesStore, useUserStore } from '@features/auth';
import { getUserId, saveUserId } from '@shared/auth/auth-storage';
import { getAccessToken, saveTokens } from '@shared/auth/tokens';
import { handleUnauthorized, setUnauthorizedHandler } from '@shared/auth/unauthorized';
import { installUnauthorizedHandler } from './unauthorized-handler';

const Blank = defineComponent({ template: '<div />' });

function createHandledRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: Blank,
        children: [{ path: 'demo', name: 'demo', component: Blank }],
      },
      {
        path: '/auth/login',
        name: 'login',
        component: Blank,
        meta: { guestOnly: true },
      },
    ],
  });
  installUnauthorizedHandler(router);
  return router;
}

describe('installUnauthorizedHandler', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    setUnauthorizedHandler(undefined);
    clearLoginSession();
    window.localStorage.clear();
  });

  it('clears in-memory auth and sends protected routes to login', async () => {
    saveTokens('access-token');
    saveUserId(12);
    loginSession.login = {
      success: true,
      doTime: null,
      message: '',
      code: 200,
      accessCode: 'pending-access',
      refresh: '',
      userId: 12,
      twofactorActive: true,
    };
    useAuthoritiesStore().setItems([{ key: 'user-panel' }]);
    useUserStore().setMe({
      id: '12',
      username: 'azadeh',
      firstName: '',
      lastName: '',
      fullName: 'tara_panel_test',
      mobile: null,
      avatar: 'https://cdn.example/avatar.png',
    });

    const router = createHandledRouter();
    await router.push('/demo');
    handleUnauthorized();

    expect(getAccessToken()).toBeNull();
    expect(getUserId()).toBeNull();
    expect(loginSession.login).toBeNull();
    expect(useAuthoritiesStore().loaded).toBe(false);
    expect(useAuthoritiesStore().has('user-panel')).toBe(false);
    expect(useUserStore().me).toBeNull();
    await vi.waitFor(() => {
      expect(router.currentRoute.value.path).toBe('/auth/login');
    });
  });

  it('stays on guest-only routes after in-memory cleanup', async () => {
    const router = createHandledRouter();
    await router.push('/auth/login');
    handleUnauthorized();
    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/auth/login');
  });
});
