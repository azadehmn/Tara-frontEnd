import { getActivePinia } from 'pinia';
import { useAuthoritiesStore } from '../store/authorities.store';
import type { LoginBackofficeResponse } from './login';

export type LoginSession = {
  login: LoginBackofficeResponse | null;
};

export const loginSession: LoginSession = {
  login: null,
};

export function hasOtpChallenge(): boolean {
  return Boolean(loginSession.login?.twofactorActive);
}

export function clearLoginSession(): void {
  loginSession.login = null;

  const pinia = getActivePinia();
  if (pinia) useAuthoritiesStore(pinia).reset();
}
