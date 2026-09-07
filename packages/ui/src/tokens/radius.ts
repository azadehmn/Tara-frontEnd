/**
 * Border radius scale.
 * `full` is a circle/pill (100%).
 */
export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '100%',
} as const;

export type TrRadiusToken = typeof radius;
