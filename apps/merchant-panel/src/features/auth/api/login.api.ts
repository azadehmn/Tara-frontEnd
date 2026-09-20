import { ApiError } from '@shared/api/errors/api-error';
import { clubClient, publicClubClient } from '@shared/api/clients/club.client';
import type {
  LoginBackofficeResponse,
  LoginPayload,
  VerifyLoginPayload,
  VerifyLoginResponse,
} from '../model/login';
import type { UserAuthoritiesResponse } from '../model/authority';
import { authEndpoints } from './endpoints';

export async function loginBackoffice(
  payload: LoginPayload,
): Promise<LoginBackofficeResponse> {
  const response = await publicClubClient.post<LoginBackofficeResponse>(
    authEndpoints.loginBackoffice,
    payload,
  );

  if (!response?.success || !response.accessCode || response.userId == null) {
    throw new ApiError(response?.message || 'login failed', 200);
  }

  return response;
}

export async function getUserAuthorities(
  userId: number | string,
): Promise<UserAuthoritiesResponse> {
  const response = await clubClient.get<UserAuthoritiesResponse>(
    authEndpoints.userAuthorities(userId),
  );

  return Array.isArray(response) ? response : [];
}

export async function verifyLogin(payload: VerifyLoginPayload): Promise<VerifyLoginResponse> {
  const response = await clubClient.post<VerifyLoginResponse>(
    authEndpoints.loginVerify,
    payload,
  );

  if (!response?.accessToken || !response.refreshToken) {
    throw new ApiError('verify failed', 200);
  }

  return response;
}
