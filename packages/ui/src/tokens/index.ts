/**
 * Design tokens are currently duplicated between TypeScript exports and the
 * Tailwind CSS theme. Consolidation to a single source of truth will be handled
 * separately if runtime token access is required.
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
