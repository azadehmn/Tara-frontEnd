import type { SupportedLocale } from '@tara/locale';

const INTL_LOCALES: Record<SupportedLocale, string> = {
  fa: 'fa-IR',
  en: 'en-US',
};

/** Money value, without a currency symbol. */
export function formatAmount(value: number, locale: string): string {
  return numberFormatter(locale).format(value);
}

/** Plain count, such as a number of transactions. */
export function formatNumber(value: number, locale: string): string {
  return numberFormatter(locale).format(value);
}

export function toIntlLocale(locale: string): string {
  return INTL_LOCALES[locale === 'en' ? 'en' : 'fa'];
}

function numberFormatter(locale: string): Intl.NumberFormat {
  return new Intl.NumberFormat(toIntlLocale(locale), { maximumFractionDigits: 0 });
}
