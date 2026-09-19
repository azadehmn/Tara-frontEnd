import { ApiError } from '@shared/api/errors/api-error';
import { clubClient } from '@shared/api/clients/club.client';
import type { LoginBackofficeResponse, LoginCredentials } from '../model/login';
import { authEndpoints } from './endpoints';

export async function loginBackoffice(
  credentials: LoginCredentials,
): Promise<LoginBackofficeResponse> {
  const payload = await clubClient.post<LoginBackofficeResponse>(
    authEndpoints.loginBackoffice,
    credentials,
  );

  if (!payload?.success || !payload.accessCode || payload.userId == null) {
    throw new ApiError(payload?.message || 'login failed', 200);
  }

  return payload;
}

export async function getUserAuthorities(userId: number | string): Promise<unknown> {
  return clubClient.get<unknown>(authEndpoints.userAuthorities(userId));
}
