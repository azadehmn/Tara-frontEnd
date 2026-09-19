import type { LoginBackofficeResponse } from './login';

export type LoginSession = {
  login: LoginBackofficeResponse | null;
  authorities: unknown;
};

export const loginSession: LoginSession = {
  login: null,
  authorities: null,
};
