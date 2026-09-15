import type { SupportedLocale } from '@tara/locale';
import { jalaliDayOfMonth, parseIsoDate } from './jalali-day';

export function formatIncomeChartDate(isoDate: string, locale: SupportedLocale): string {
  return dateFormatter(locale).format(parseIsoDate(isoDate));
}

export function formatIncomeChartDateRange(
  from: string,
  to: string,
  locale: SupportedLocale,
): string {
  return dateFormatter(locale).formatRange(parseIsoDate(from), parseIsoDate(to));
}

export function formatIncomeChartDayInMonth(
  monthAnchorIso: string,
  jalaliDay: number,
  locale: SupportedLocale,
): string {
  const originDay = jalaliDayOfMonth(monthAnchorIso);
  const date = parseIsoDate(monthAnchorIso);
  date.setUTCDate(date.getUTCDate() + (jalaliDay - originDay));
  return formatIncomeChartDate(date.toISOString().slice(0, 10), locale);
}

export function toSupportedLocale(locale: string): SupportedLocale {
  return locale === 'en' ? 'en' : 'fa';
}

function dateFormatter(locale: SupportedLocale): Intl.DateTimeFormat {
  switch (locale) {
    case 'fa':
      return new Intl.DateTimeFormat('fa-IR', {
        calendar: 'persian',
        day: 'numeric',
        month: 'long',
        timeZone: 'UTC',
      });
    case 'en':
      return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      });
  }
}
