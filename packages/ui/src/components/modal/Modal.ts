export type TrModalSize = 'sm' | 'md' | 'lg';

export type TrModalProps = {
  /** When false the modal is not in the document. */
  open?: boolean;
  /** Header title. Prefer this or the `header` slot. */
  title?: string;
  showHeader?: boolean;
  showClose?: boolean;
  closeOnOutside?: boolean;
  headerBorder?: boolean;
  footerBorder?: boolean;
  bodyClass?: string;
  /** Desktop width. Empty keeps the `size` track. */
  width?: string;
  size?: TrModalSize;
  closeAriaLabel?: string;
};
