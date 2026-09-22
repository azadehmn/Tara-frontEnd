import { clubClient } from '@shared/api/clients/club.client';
import { AUTH_ME_USE_MOCK } from '../config/data-source';
import type { CurrentUser } from '../model/user';
import { authEndpoints } from './endpoints';
import { mapCurrentUser } from './mappers/user.mapper';
import { userMeMock } from './user.mock';

export async function getMe(config?: { signal?: AbortSignal }): Promise<CurrentUser> {
  const payload = AUTH_ME_USE_MOCK
    ? userMeMock
    : await clubClient.get<unknown>(authEndpoints.me, config);

  return mapCurrentUser(payload);
}
