import { createPinia, setActivePinia } from 'pinia';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '@shared/api/errors/api-error';
import { getMe } from '../api/user.api';
import { userMeMock } from '../api/user.mock';
import { mapCurrentUser } from '../api/mappers/user.mapper';
import { useUserStore } from './user.store';

vi.mock('../api/user.api', () => ({
  getMe: vi.fn(),
}));

const getMeMock = vi.mocked(getMe);
const mappedMe = mapCurrentUser(userMeMock);

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    useUserStore().reset();
    getMeMock.mockReset();
  });

  afterEach(() => {
    useUserStore().reset();
  });

  it('returns an empty avatar when me is missing', () => {
    expect(useUserStore().avatar).toBe('');
  });

  it('stores the me response and exposes the avatar', async () => {
    const withAvatar = { ...mappedMe, avatar: 'https://cdn.example/user.png' };
    getMeMock.mockResolvedValue(withAvatar);
    const store = useUserStore();

    await store.fetch();

    expect(getMeMock).toHaveBeenCalledWith({ signal: expect.any(AbortSignal) });
    expect(store.loaded).toBe(true);
    expect(store.me).toEqual(withAvatar);
    expect(store.avatar).toBe('https://cdn.example/user.png');
  });

  it('falls back to an empty avatar when the me response has none', async () => {
    getMeMock.mockResolvedValue({ ...mappedMe, avatar: null });
    const store = useUserStore();

    await store.fetch();

    expect(store.loaded).toBe(true);
    expect(store.avatar).toBe('');
  });

  it('does not treat a 401 as a loaded empty user', async () => {
    getMeMock.mockRejectedValue(new ApiError('unauthorized', 401));
    const store = useUserStore();

    await expect(store.fetch()).resolves.toBeUndefined();

    expect(store.loaded).toBe(false);
    expect(store.me).toBeNull();
    expect(store.error).toBeNull();
  });

  it('reuses an in-flight fetch instead of calling the api twice', async () => {
    let resolveFetch: ((value: typeof mappedMe) => void) | undefined;
    getMeMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve;
        }),
    );
    const store = useUserStore();

    const first = store.fetch();
    const second = store.fetch();
    resolveFetch?.(mappedMe);
    await Promise.all([first, second]);

    expect(getMeMock).toHaveBeenCalledTimes(1);
    expect(store.me?.id).toBe(mappedMe.id);
  });

  it('does not fetch me again after a successful load', async () => {
    getMeMock.mockResolvedValue(mappedMe);
    const store = useUserStore();

    await store.fetch();
    await store.fetch();

    expect(getMeMock).toHaveBeenCalledTimes(1);
    expect(store.me?.id).toBe(mappedMe.id);
  });

  it('fetches me again after reset, like a page refresh', async () => {
    getMeMock.mockResolvedValue(mappedMe);
    const store = useUserStore();

    await store.fetch();
    store.reset();
    await store.fetch();

    expect(getMeMock).toHaveBeenCalledTimes(2);
  });
});
