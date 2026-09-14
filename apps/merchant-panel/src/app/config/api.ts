
export const API_SERVICES = ['club', 'bnpl', 'settings', 'report'] as const;

export type ApiServiceName = (typeof API_SERVICES)[number];

export const API_BASE_PATHS = {
  club: {
    default: '/club/api/',
    v1: '/club/api/v1/',
  },
  bnpl: '/bnpl/api/',
  settings: '/settings/api/v1/',
  report: '/dreport/api/dr/bo/report/execution/v1/',
} as const;

export type ClubApiVersion = keyof typeof API_BASE_PATHS.club;

export const PANEL_DEVICE_TYPE = 'DEVICE_TYPE_PANEL';

// host api
export function getApiOrigin(): string {
  if (import.meta.env.DEV) return '';

  return stripTrailingSlash(requireEnv(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL'));
}
// host documents
export function getDocsOrigin(): string {
  if (import.meta.env.DEV) return '/tara-docs';

  return stripTrailingSlash(requireEnv(import.meta.env.VITE_DOC_ORIGIN, 'VITE_DOC_ORIGIN'));
}

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}
