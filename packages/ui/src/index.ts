/**
 * Tara UI kit public API.
 * Template tags after `app.use(taraUi)`: Tr-Button,.....
 */
export { taraUi } from './plugin';
export { TrButton } from './components/button';
export type {
  TrButtonHtmlType,
  TrButtonProps,
  TrButtonSize,
  TrButtonVariant,
} from './components/button';
export { TrTopBar } from './components/TopBar';
export type { TrTopBarProps } from './components/TopBar';
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
