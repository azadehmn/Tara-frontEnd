import type { SupportedLocale } from '@tara/locale';

const INTL_LOCALES: Record<SupportedLocale, string> = {
  fa: 'fa-IR',
  en: 'en-US',
};

const numberFormatters: Record<SupportedLocale, Intl.NumberFormat> = {
  fa: new Intl.NumberFormat(INTL_LOCALES.fa, { maximumFractionDigits: 0 }),
  en: new Intl.NumberFormat(INTL_LOCALES.en, { maximumFractionDigits: 0 }),
};

const percentFormatters: Record<SupportedLocale, Intl.NumberFormat> = {
  fa: new Intl.NumberFormat(INTL_LOCALES.fa, {
    style: 'percent',
    maximumFractionDigits: 2,
  }),
  en: new Intl.NumberFormat(INTL_LOCALES.en, {
    style: 'percent',
    maximumFractionDigits: 2,
  }),
};

/** Money value, without a currency symbol. */
export function formatAmount(value: number, locale: string): string {
  return numberFormatters[toSupportedLocale(locale)].format(value);
}

/** Plain count, such as a number of transactions. */
export function formatNumber(value: number, locale: string): string {
  return numberFormatters[toSupportedLocale(locale)].format(value);
}

/** Percentage where 2.5 means 2.5%, not 250%. */
export function formatPercent(value: number, locale: string): string {
  return percentFormatters[toSupportedLocale(locale)].format(value / 100);
}

export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[toSupportedLocale(locale)];
}

function toSupportedLocale(locale: string): SupportedLocale {
  return locale === 'en' ? 'en' : 'fa';
}
