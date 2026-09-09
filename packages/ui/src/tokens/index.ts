/**
 * Runtime TypeScript token maps for JS (e.g. matchMedia).
 * CSS source of truth is `src/styles/tokens` via Tailwind 4 `@theme`.
 */
export { color } from './color';
export type { TrColorState, TrColorToken, TrOutlinePalette, TrPalette } from './color';

export { radius } from './radius';
export type { TrRadiusToken } from './radius';

export { spacing } from './spacing';
export type { TrSpacingToken } from './spacing';

export { breakpoint } from './breakpoint';
export type { TrBreakpointToken } from './breakpoint';

export { typography } from './typography';
export type { TrResponsiveType, TrTypeStyle, TrTypographyToken } from './typography';
