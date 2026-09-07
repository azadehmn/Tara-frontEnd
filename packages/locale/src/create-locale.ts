import { createI18n } from 'vue-i18n';
import { appCatalog, type LocaleAppId } from './apps/catalog';
import { commonMessages } from './common';
import { mergeLocaleMessages } from './merge-messages';
import type { SupportedLocale } from './types';

export type CreateLocaleOptions = {
  /** Must match a folder registered in `apps/catalog.ts`. */
  app: LocaleAppId;
  locale?: SupportedLocale;
  fallbackLocale?: SupportedLocale;
};

/**
 * Builds a Composition API vue-i18n instance for one Tara app.
 * Default locale is Persian; English is the fallback for missing keys.
 */
export function createLocale(options: CreateLocaleOptions) {
  const messages = mergeLocaleMessages(commonMessages, appCatalog[options.app]);

  return createI18n({
    legacy: false,
    locale: options.locale ?? 'fa',
    fallbackLocale: options.fallbackLocale ?? 'en',
    messages,
  });
}
