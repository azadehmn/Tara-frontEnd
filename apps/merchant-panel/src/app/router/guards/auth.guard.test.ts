import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearLoginSession, loginSession, useAuthoritiesStore } from '@features/auth';
import { clearAuthStorage, saveUserId } from '@shared/auth/auth-storage';
import { hasAccessToken, saveTokens } from '@shared/auth/tokens';
import { getUserAuthorities } from '@features/auth/api/login.api';
import { ApiError } from '@shared/api/errors/api-error';
import { installAuthGuard } from './auth.guard';

vi.mock('@features/auth/api/login.api', () => ({
  getUserAuthorities: vi.fn(),
}));

const getUserAuthoritiesMock = vi.mocked(getUserAuthorities);
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
          { path: '', redirect: { name: 'dashboard' } },
          { path: 'dashboard', name: 'dashboard', component: Blank, meta: { permission: 'user-panel' } },
          { path: 'demo', name: 'demo', component: Blank },
          {
            path: 'invoices',
            name: 'invoices',
            component: Blank,
            meta: { permission: 'chekout_acceptor_merchant' },
          },
          {
            path: 'contracts/organization',
            name: 'contracts-organization',
            component: Blank,
            meta: { permission: 'contractsGuarantor' },
          },
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
  beforeEach(() => {
    setActivePinia(createPinia());
    getUserAuthoritiesMock.mockReset();
    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }]);
  });

  afterEach(() => {
    clearAuthStorage();
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
    saveUserId(12);
    const router = createGuardedRouter();
    await router.push('/auth/login');
    expect(router.currentRoute.value.path).toBe('/dashboard');
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

  it('sends users without the route permission back to the dashboard', async () => {
    saveTokens('access-token');
    saveUserId(12);
    const router = createGuardedRouter();
    await router.push('/invoices');
    expect(router.currentRoute.value.path).toBe('/dashboard');
    expect(useAuthoritiesStore().has('chekout_acceptor_merchant')).toBe(false);
  });

  it('lets guarantors open organization contracts without contractsMerchant', async () => {
    saveTokens('access-token');
    saveUserId(12);
    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }, { key: 'contractsGuarantor' }]);
    const router = createGuardedRouter();
    await router.push('/contracts/organization');
    expect(router.currentRoute.value.path).toBe('/contracts/organization');
  });

  it('sends merchants away from organization contracts', async () => {
    saveTokens('access-token');
    saveUserId(12);
    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }, { key: 'contractsMerchant' }]);
    const router = createGuardedRouter();
    await router.push('/contracts/organization');
    expect(router.currentRoute.value.path).toBe('/dashboard');
  });

  it('keeps a token session without a user id', async () => {
    saveTokens('access-token');
    const router = createGuardedRouter();
    await router.push('/demo');
    expect(router.currentRoute.value.path).toBe('/demo');
    expect(getUserAuthoritiesMock).not.toHaveBeenCalled();
    expect(hasAccessToken()).toBe(true);
  });

  it('does not log out when authorities fail with a server error', async () => {
    saveTokens('access-token');
    saveUserId(12);
    getUserAuthoritiesMock.mockRejectedValue(new ApiError('server error', 500));
    const router = createGuardedRouter();
    await router.push('/demo');
    expect(router.currentRoute.value.path).toBe('/demo');
    expect(hasAccessToken()).toBe(true);
    expect(useAuthoritiesStore().error?.status).toBe(500);
  });
});
