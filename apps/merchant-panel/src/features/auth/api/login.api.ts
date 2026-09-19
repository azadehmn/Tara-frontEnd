import { ApiError } from '@shared/api/errors/api-error';
import { clubClient } from '@shared/api/clients/club.client';
import type { LoginBackofficeResponse, LoginPayload } from '../model/login';
import { authEndpoints } from './endpoints';

export async function loginBackoffice(
  payload: LoginPayload,
): Promise<LoginBackofficeResponse> {
  const response = await clubClient.post<LoginBackofficeResponse>(
    authEndpoints.loginBackoffice,
    payload,
  );

  if (!response?.success || !response.accessCode || response.userId == null) {
    throw new ApiError(response?.message || 'login failed', 200);
  }

  return response;
}

export async function getUserAuthorities(userId: number | string): Promise<unknown> {
  return clubClient.get<unknown>(authEndpoints.userAuthorities(userId));
}
