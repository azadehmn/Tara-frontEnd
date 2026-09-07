/**
 * @tara/locale public API.
 *
 * Apps should import from this barrel only (`createLocale`, types, catalog).
 * Translation files stay inside this package so every Tara app shares one i18n layer.
 */
export { createLocale, type CreateLocaleOptions } from './create-locale';
export { appCatalog, type LocaleAppId } from './apps/catalog';
export {
  supportedLocales,
  type SupportedLocale,
  type LocaleMessages,
  type MessageTree,
} from './types';
