import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@shared/api/errors/api-error';
import { clearAuthStorage, saveUserId } from '@shared/auth/auth-storage';
import { getUserAuthorities } from '../api/login.api';
import { useAuthoritiesStore } from './authorities.store';

vi.mock('../api/login.api', () => ({
  getUserAuthorities: vi.fn(),
}));

const getUserAuthoritiesMock = vi.mocked(getUserAuthorities);

describe('useAuthoritiesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useAuthoritiesStore().reset();
    getUserAuthoritiesMock.mockReset();
  });

  afterEach(() => {
    clearAuthStorage();
  });

  it('treats disabled and deactivated keys as missing', () => {
    const store = useAuthoritiesStore();
    store.setItems([
      { key: 'user-panel' },
      { key: 'contractsMerchant', disabled: true },
      { key: 'org_transactions', deactivated: true },
    ]);

    expect(store.has('user-panel')).toBe(true);
    expect(store.has('contractsMerchant')).toBe(false);
    expect(store.has('org_transactions')).toBe(false);
  });

  it('grants organization contracts when either merchant or guarantor key is present', () => {
    const store = useAuthoritiesStore();
    store.setItems([{ key: 'contractsGuarantor' }]);

    expect(store.hasAny(['contractsMerchant', 'contractsGuarantor'])).toBe(true);
    expect(store.hasAny('contractsMerchant')).toBe(false);
    expect(store.hasAny('contractsGuarantor')).toBe(true);
  });

  it('loads grants for the persisted user id', async () => {
    saveUserId(64);
    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }]);
    const store = useAuthoritiesStore();

    await store.fetch();

    expect(getUserAuthoritiesMock).toHaveBeenCalledWith('64', {
      signal: expect.any(AbortSignal),
    });
    expect(store.loaded).toBe(true);
    expect(store.has('user-panel')).toBe(true);
  });

  it('grants nothing without a user id and retries after one is persisted', async () => {
    const store = useAuthoritiesStore();

    await store.fetch();

    expect(getUserAuthoritiesMock).not.toHaveBeenCalled();
    expect(store.loaded).toBe(false);
    expect(store.error).toBeNull();
    expect(store.has('user-panel')).toBe(false);

    saveUserId(64);
    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }]);
    await store.fetch();

    expect(getUserAuthoritiesMock).toHaveBeenCalledWith('64', {
      signal: expect.any(AbortSignal),
    });
    expect(store.loaded).toBe(true);
    expect(store.has('user-panel')).toBe(true);
  });

  it('keeps the session and retries later when the request fails with a server error', async () => {
    saveUserId(64);
    getUserAuthoritiesMock.mockRejectedValue(new ApiError('server error', 500));
    const store = useAuthoritiesStore();

    await expect(store.fetch()).resolves.toBeUndefined();

    expect(store.loaded).toBe(false);
    expect(store.error?.status).toBe(500);
    expect(store.has('user-panel')).toBe(false);

    getUserAuthoritiesMock.mockResolvedValue([{ key: 'user-panel' }]);
    await store.fetch();

    expect(store.loaded).toBe(true);
    expect(store.error).toBeNull();
    expect(store.has('user-panel')).toBe(true);
  });

  it('does not treat a 401 as a loaded empty grant list', async () => {
    saveUserId(64);
    getUserAuthoritiesMock.mockRejectedValue(new ApiError('unauthorized', 401));
    const store = useAuthoritiesStore();

    await expect(store.fetch()).resolves.toBeUndefined();

    expect(store.loaded).toBe(false);
    expect(store.error).toBeNull();
    expect(store.has('user-panel')).toBe(false);
  });

  it('reuses an in-flight fetch instead of calling the api twice', async () => {
    saveUserId(64);
    let resolveFetch: ((value: { key: string }[]) => void) | undefined;
    getUserAuthoritiesMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const store = useAuthoritiesStore();

    const first = store.fetch();
    const second = store.fetch();
    resolveFetch?.([{ key: 'user-panel' }]);
    await Promise.all([first, second]);

    expect(getUserAuthoritiesMock).toHaveBeenCalledTimes(1);
    expect(store.has('user-panel')).toBe(true);
  });

  it('does not restore grants from a request that resolves after reset', async () => {
    saveUserId(64);
    let resolveFirst: ((value: { key: string }[]) => void) | undefined;
    getUserAuthoritiesMock.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveFirst = resolve;
        }),
    );
    const store = useAuthoritiesStore();
    const first = store.fetch();
    const signal = getUserAuthoritiesMock.mock.calls[0]?.[1]?.signal;

    store.reset();

    expect(signal?.aborted).toBe(true);
    expect(store.loaded).toBe(false);
    expect(store.has('user-panel')).toBe(false);

    saveUserId(99);
    getUserAuthoritiesMock.mockResolvedValueOnce([{ key: 'org_transactions' }]);
    await store.fetch();

    resolveFirst?.([{ key: 'user-panel' }]);
    await first;

    expect(store.loaded).toBe(true);
    expect(store.has('org_transactions')).toBe(true);
    expect(store.has('user-panel')).toBe(false);
  });
});
