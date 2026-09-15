import { describe, expect, it } from 'vitest';
import {
  formatIncomeChartDate,
  formatIncomeChartDateRange,
  formatIncomeChartDayInMonth,
} from './format-income-date';

describe('formatIncomeChartDate', () => {
  it('formats 2026-09-15 as 24 Shahrivar in fa', () => {
    expect(formatIncomeChartDate('2026-09-15', 'fa')).toBe('۲۴ شهریور');
  });

  it('formats a Persian date range with locale conjunction', () => {
    expect(formatIncomeChartDateRange('2026-08-23', '2026-09-15', 'fa')).toBe(
      '۱ شهریور تا ۲۴ شهریور',
    );
  });

  it('formats an English date range without Persian words', () => {
    expect(formatIncomeChartDateRange('2026-08-23', '2026-09-15', 'en')).toBe(
      new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      }).formatRange(new Date(Date.UTC(2026, 7, 23, 12)), new Date(Date.UTC(2026, 8, 15, 12))),
    );
  });

  it('formats the nth Jalali day of the current month', () => {
    expect(formatIncomeChartDayInMonth('2026-08-23', 24, 'fa')).toBe('۲۴ شهریور');
  });
});
