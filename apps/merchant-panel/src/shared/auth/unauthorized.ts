import { clearTokens } from './token-storage';

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

export function handleUnauthorized(): void {
  clearTokens();
  handler?.();
}
