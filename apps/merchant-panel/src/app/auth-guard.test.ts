import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { afterEach, describe, expect, it } from 'vitest';
import { loginSession } from '@features/auth';
import { clearTokens, saveTokens } from '@shared/auth/token-storage';
import { installAuthGuard } from './auth-guard';

const Blank = defineComponent({ template: '<div />' });

function createGuardedRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: Blank,
        meta: { requiresAuth: true },
        children: [{ path: '', name: 'dashboard', component: Blank }],
      },
      {
        path: '/auth',
        component: Blank,
        meta: { guest: true },
        children: [
          { path: 'login', name: 'login', component: Blank },
          { path: 'otp', name: 'otp', component: Blank },
        ],
      },
    ],
  });
  installAuthGuard(router);
  return router;
}

describe('installAuthGuard', () => {
  afterEach(() => {
    clearTokens();
    loginSession.login = null;
    loginSession.authorities = null;
  });

  it('sends guests on protected routes to login', async () => {
    const router = createGuardedRouter();
    await router.push('/');
    expect(router.currentRoute.value.name).toBe('login');
  });

  it('sends authenticated users from login to dashboard', async () => {
    saveTokens('access-token');
    const router = createGuardedRouter();
    await router.push('/auth/login');
    expect(router.currentRoute.value.name).toBe('dashboard');
  });

  it('keeps pending two-factor users on otp instead of dashboard', async () => {
    saveTokens('access-token');
    loginSession.login = {
      success: true,
      doTime: null,
      message: '',
      code: 200,
      accessCode: 'access-token',
      refresh: '',
      userId: 12,
      twofactorActive: true,
    };
    const router = createGuardedRouter();
    await router.push('/auth/login');
    expect(router.currentRoute.value.name).toBe('otp');
  });
});
