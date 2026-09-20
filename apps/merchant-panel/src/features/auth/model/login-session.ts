import type { LoginBackofficeResponse } from './login';
import type { UserAuthoritiesResponse } from './authority';

export type LoginSession = {
  login: LoginBackofficeResponse | null;
  authorities: UserAuthoritiesResponse | null;
};

export const loginSession: LoginSession = {
  login: null,
  authorities: null,
};

export function hasOtpChallenge(): boolean {
  return Boolean(loginSession.login?.twofactorActive);
}

export function clearLoginSession(): void {
  loginSession.login = null;
  loginSession.authorities = null;
}
