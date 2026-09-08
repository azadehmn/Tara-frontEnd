export type TrButtonVariant = 'primary' | 'secondary' | 'outlined';

export type TrButtonSize = 'small' | 'medium' | 'large';

export type TrButtonHtmlType = 'button' | 'submit' | 'reset';

export type TrButtonProps = {
  /** Visual style. */
  variant?: TrButtonVariant;
  size?: TrButtonSize;
  /** Native button type. */
  htmlType?: TrButtonHtmlType;
  disabled?: boolean;
  loading?: boolean;
  /** Selected / pressed visual (aria-pressed). */
  selected?: boolean;
  /** Visible label. Prefer this or the default slot; omit both for icon-only. */
  text?: string;
  /** Required for icon-only buttons. */
  ariaLabel?: string;
};
