export type TrTextareaHelperType = 'error' | 'success' | 'info';

export type TrTextareaHelper = {
  type?: TrTextareaHelperType;
  message?: string;
};

export type TrTextareaProps = {
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  /** Floating label. Defaults to `placeholder`. */
  labelText?: string;
  label?: boolean;
  loading?: boolean;
  rows?: number;
  modelValue?: string;
  helper?: TrTextareaHelper;
  maxLength?: number;
};
