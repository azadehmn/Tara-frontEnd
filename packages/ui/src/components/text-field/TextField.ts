import type { Component } from 'vue';
import { toPersianWords } from './toPersianWords';

export type TrTextFieldHelperType = 'error' | 'success' | 'info';

export type TrTextFieldHelper = {
  type?: TrTextFieldHelperType;
  message?: string;
};

export type TrTextFieldProps = {
  modelValue?: string;
  /** Native name. Also used as the input id when `id` is omitted. */
  name?: string;
  id?: string;
  placeholder?: string;
  /**
   * When true, `placeholder` floats above the field on focus or when it has a value.
   * Default `true`.
   */
  label?: boolean;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  /** Restrict typing and pasted values to digits. */
  isNumber?: boolean;
  /** Group digits with commas (amounts). */
  amount?: boolean;
  /** Force LTR on the control (cards, IBAN, amount, …). */
  isLtr?: boolean;
  /** Extra class on the native input. */
  inputClass?: string;
  maxLength?: number;
  helper?: TrTextFieldHelper;
  /** Trailing unit, e.g. ریال. Ignored when `afterIcon` / `#after` is set. */
  unit?: string;
  /** Trailing action label. Ignored when `afterIcon` / `#after` or `unit` is set. */
  button?: string;
  beforeIcon?: Component;
  afterIcon?: Component;
};

export type TrTextFieldSanitizeOptions = {
  amount?: boolean;
  isNumber?: boolean;
  maxLength?: number;
};

const ARABIC_INDIC_ZERO = 1632;
const EASTERN_ARABIC_ZERO = 1776;

export function toEnNumber(value: string | number): string {
  return String(value)
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - ARABIC_INDIC_ZERO))
    .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - EASTERN_ARABIC_ZERO));
}

export function formatAmount(value: string, maxLength = 0): string {
  const digits = toEnNumber(value).replace(/\D/g, '');
  if (!digits) return '';
  const clipped = maxLength > 0 ? digits.slice(0, maxLength) : digits;
  return new Intl.NumberFormat('en-US').format(Number(clipped));
}

export function sanitizeTextFieldValue(
  value: string,
  options: TrTextFieldSanitizeOptions = {},
): string {
  const english = toEnNumber(value);
  const maxLength = options.maxLength ?? 0;

  if (options.amount) return formatAmount(english, maxLength);

  const next = options.isNumber ? english.replace(/\D/g, '') : english;
  return maxLength > 0 ? next.slice(0, maxLength) : next;
}

export function amountInWords(value: string): string {
  const digits = toEnNumber(value).replace(/\D/g, '');
  if (!digits) return '';
  const numeric = Number(digits);
  if (!Number.isFinite(numeric) || numeric === 0) return '';
  return toPersianWords(numeric);
}

export function isDigitKey(event: KeyboardEvent): boolean {
  if (event.ctrlKey || event.metaKey || event.altKey) return true;
  if (event.key.length !== 1) return true;
  return /^\d$/.test(toEnNumber(event.key));
}

export { toPersianWords };
