/** Locales this workspace ships today. Add a code here when a language is actually translated. */
export const supportedLocales = ['fa', 'en'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

/** Nested dictionary used by vue-i18n (`t('errors.network')`). */
export type MessageTree = {
  [key: string]: string | MessageTree;
};

/** One message tree per supported locale. */
export type LocaleMessages = Record<SupportedLocale, MessageTree>;
