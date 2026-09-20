import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { afterEach, describe, expect, it } from 'vitest';
import { clearLoginSession, loginSession } from '@features/auth';
import { clearTokens, saveTokens } from '@shared/auth/token-storage';
import { installAuthGuard } from './auth.guard';

const Blank = defineComponent({ template: '<div />' });

function createGuardedRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: Blank,
        meta: { requiresAuth: true },
        children: [
          { path: '', name: 'dashboard', component: Blank },
          { path: 'demo', name: 'demo', component: Blank },
        ],
      },
      {
        path: '/auth',
        component: Blank,
        children: [
          { path: 'login', name: 'login', component: Blank, meta: { guestOnly: true } },
          { path: 'otp', name: 'otp', component: Blank, meta: { requiresOtpChallenge: true } },
        ],
      },
    ],
  });
  installAuthGuard(router);
  return router;
}

function startOtpChallenge() {
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
}

describe('authRouteMiddleware', () => {
  afterEach(() => {
    clearTokens();
    clearLoginSession();
  });

  it('sends guests on protected routes to login without a redirect query', async () => {
    const router = createGuardedRouter();
    await router.push('/demo');
    expect(router.currentRoute.value.fullPath).toBe('/auth/login');
  });

  it('strips a redirect query from the login url', async () => {
    const router = createGuardedRouter();
    await router.push({ path: '/auth/login', query: { redirect: '/demo' } });
    expect(router.currentRoute.value.fullPath).toBe('/auth/login');
  });

  it('sends authenticated users from login to the default authed route', async () => {
    saveTokens('access-token');
    const router = createGuardedRouter();
    await router.push('/auth/login');
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('keeps an otp challenge off protected routes until verify completes', async () => {
    startOtpChallenge();
    const router = createGuardedRouter();
    await router.push('/demo');
    expect(router.currentRoute.value.name).toBe('otp');
  });

  it('keeps pending two-factor users on otp instead of dashboard', async () => {
    startOtpChallenge();
    const router = createGuardedRouter();
    await router.push('/auth/login');
    expect(router.currentRoute.value.name).toBe('otp');
  });
});
