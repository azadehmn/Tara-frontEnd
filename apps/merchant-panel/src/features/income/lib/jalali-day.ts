/** Gregorian ISO date at UTC noon, so Jalali conversion is not shifted by timezone. */
export function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

/**
 * Jalali day-of-month as a latin number (1 not ۱).
 * `en-US-u-ca-persian` keeps Latin digits while using the Persian calendar.
 */
export function jalaliDayOfMonth(isoDate: string): number {
  const part = new Intl.DateTimeFormat('en-US-u-ca-persian', {
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parseIsoDate(isoDate));
  return Number(part);
}
