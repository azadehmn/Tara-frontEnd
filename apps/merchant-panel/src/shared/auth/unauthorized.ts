import { clearAuthStorage } from './auth-storage';

type UnauthorizedHandler = () => void;

let handler: UnauthorizedHandler | undefined;

export function setUnauthorizedHandler(next?: UnauthorizedHandler): void {
  handler = next;
}

export function isCredentialAuthPath(path: string): boolean {
  return (
    path.includes('auth/user/panel/v1/login/backoffice') ||
    path.includes('auth/user/v1/login/verify')
  );
}

/** Clears persistent auth storage, then runs the app handler for in-memory state and navigation. */
export function handleUnauthorized(): void {
  clearAuthStorage();
  handler?.();
}
