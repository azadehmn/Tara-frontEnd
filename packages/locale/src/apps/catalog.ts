import type { LocaleMessages } from '../types';
import { merchantPanelMessages } from './merchant-panel';

/**
 * Maps each app id to its message bundle.
 *
 * To add a product:
 * 1. Create `apps/<app-name>/` with `fa.ts`, `en.ts`, `index.ts` (same name as `apps/<app-name>` in the repo).
 * 2. Import it here and add a key on `appCatalog`.
 */
export const appCatalog = {
  'merchant-panel': merchantPanelMessages,
} as const satisfies Record<string, LocaleMessages>;

export type LocaleAppId = keyof typeof appCatalog;
