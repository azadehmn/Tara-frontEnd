export type TrLabelType =
  | 'neutral'
  | 'informative'
  | 'negative'
  | 'warning'
  | 'primary'
  | 'outlined'
  | 'positive';

export type TrLabelSize = 'small' | 'medium';

export type TrLabelRadius = 'sm' | 'md' | 'full';

export type TrLabelWidth = 'fit' | 'full';

export type TrLabelProps = {
  text: string | number;
  type?: TrLabelType;
  size?: TrLabelSize;
  radius?: TrLabelRadius;
  width?: TrLabelWidth;
};
