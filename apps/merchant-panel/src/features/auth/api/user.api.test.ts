import { describe, expect, it } from 'vitest';
import { mapCurrentUser } from './mappers/user.mapper';
import { getMe } from './user.api';
import { userMeMock } from './user.mock';

describe('getMe', () => {
  it('reads the mocked me payload', async () => {
    await expect(getMe()).resolves.toEqual(mapCurrentUser(userMeMock));
  });
});
