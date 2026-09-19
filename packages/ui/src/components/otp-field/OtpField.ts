import type { TrTextFieldHelper } from '../text-field';
import { toEnNumber } from '../text-field';

export type TrOtpFieldHelper = TrTextFieldHelper;

export type TrOtpFieldProps = {
  modelValue?: string;
  /** Number of digit cells. */
  codeLength?: number;
  name?: string;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  helper?: TrOtpFieldHelper;
  /** Accessible name for the group of cells. */
  ariaLabel?: string;
};

export function sanitizeOtpValue(value: string, length: number): string {
  return toEnNumber(value).replace(/\D/g, '').slice(0, Math.max(0, length));
}
