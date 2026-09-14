/**
 * Layout breakpoints (min-width).
 * Named like Tailwind screens, values from the Tara scale.
 */
export const breakpoint = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '912px',
  xl: '1200px',
  '2xl': '1456px',
} as const;

export type TrBreakpointToken = typeof breakpoint;
