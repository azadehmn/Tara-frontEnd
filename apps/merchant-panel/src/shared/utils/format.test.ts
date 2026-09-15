import { describe, expect, it } from 'vitest';
import { formatAmount, formatNumber, toIntlLocale } from './format';

describe('formatAmount', () => {
  it('groups digits for the active locale', () => {
    expect(formatAmount(18_500_000, 'en')).toBe('18,500,000');
    expect(formatAmount(18_500_000, 'fa')).toBe(
      new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0 }).format(18_500_000),
    );
  });

  it('drops fractions', () => {
    expect(formatAmount(1234.56, 'en')).toBe('1,235');
  });
});

describe('formatNumber', () => {
  it('formats counts', () => {
    expect(formatNumber(1842, 'en')).toBe('1,842');
  });
});

describe('toIntlLocale', () => {
  it('falls back to Persian for unknown locales', () => {
    expect(toIntlLocale('en')).toBe('en-US');
    expect(toIntlLocale('fa')).toBe('fa-IR');
    expect(toIntlLocale('de')).toBe('fa-IR');
  });
});
