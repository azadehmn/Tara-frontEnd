/**
 * Tara UI kit public API (Tr / tr- prefix).
 * Apps import components from here and tokens via `color`.
 * Load theme tokens with `import '@tara/ui/styles'` after Tailwind.
 */
export { TrButton } from './components/button';
export type {
  TrButtonHtmlType,
  TrButtonProps,
  TrButtonSize,
  TrButtonVariant,
} from './components/button';
export { color, radius, spacing, breakpoint, typography } from './tokens';
export type {
  TrColorState,
  TrColorToken,
  TrOutlinePalette,
  TrPalette,
  TrRadiusToken,
  TrSpacingToken,
  TrBreakpointToken,
  TrResponsiveType,
  TrTypeStyle,
  TrTypographyToken,
} from './tokens';
