import { afterEach, describe, expect, it, vi } from 'vitest';
import { getUserId, saveUserId } from './auth-storage';
import { getAccessToken, saveTokens } from './tokens';
import { handleUnauthorized, setUnauthorizedHandler } from './unauthorized';

describe('handleUnauthorized', () => {
  afterEach(() => {
    setUnauthorizedHandler(undefined);
    window.localStorage.clear();
  });

  it('clears tokens and user id before the app handler runs', () => {
    saveTokens('access-token', 'refresh-token');
    saveUserId(12);
    const onUnauthorized = vi.fn(() => {
      expect(getAccessToken()).toBeNull();
      expect(getUserId()).toBeNull();
    });
    setUnauthorizedHandler(onUnauthorized);

    handleUnauthorized();

    expect(onUnauthorized).toHaveBeenCalledTimes(1);
    expect(getAccessToken()).toBeNull();
    expect(getUserId()).toBeNull();
  });
});
