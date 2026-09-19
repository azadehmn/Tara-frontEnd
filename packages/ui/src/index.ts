/**
 * Tara UI kit public API.
 * Template tags after `app.use(taraUi)`: TrButton, TrTable, …
 */
export { taraUi } from './plugin';
export { TrAction } from './components/action';
export type { TrActionItem, TrActionProps, TrActionTone } from './components/action';
export { TrButton } from './components/button';
export { TrIcon } from './components/icon';
export type { TrIconProps, TrIconSize } from './components/icon';
export type {
  TrButtonHtmlType,
  TrButtonProps,
  TrButtonSize,
  TrButtonVariant,
} from './components/button';
export { TrCard } from './components/card';
export type { TrCardPadding, TrCardProps } from './components/card';
export { TrLabel } from './components/label';
export type {
  TrLabelProps,
  TrLabelRadius,
  TrLabelSize,
  TrLabelType,
  TrLabelWidth,
} from './components/label';
export { TrTopBar } from './components/TopBar';
export type { TrTopBarProps } from './components/TopBar';
export { TrNavigationBar, useNavigationMode } from './components/NavigationBar';
export type {
  TrNavigationBarProps,
  TrNavigationMode,
} from './components/NavigationBar';
export { TrSegmentedControl } from './components/segmented-control';
export type {
  TrSegmentedControlOption,
  TrSegmentedControlProps,
  TrSegmentedControlSize,
  TrSegmentedControlValue,
} from './components/segmented-control';
export { TrStatus } from './components/status';
export type { TrStatusProps, TrStatusType } from './components/status';
export {
  TrTable,
  TrTableCard,
  columnSlotName,
  resolvePathValue,
  itemSlotName,
  itemTextContent,
  getRowKey,
} from './components/table';
export type {
  TrTableColumn,
  TrTableLayout,
  TrTableProps,
  TrTableRow,
  TrTableRowHoverPayload,
} from './components/table';
export { TrTextField } from './components/text-field';
export type {
  TrTextFieldHelper,
  TrTextFieldHelperType,
  TrTextFieldProps,
  TrTextFieldSanitizeOptions,
} from './components/text-field';
export {
  amountInWords,
  formatAmount,
  sanitizeTextFieldValue,
  toEnNumber,
  toPersianWords,
} from './components/text-field';
export { TrTooltip } from './components/tooltip';
export type {
  TrTooltipPlacement,
  TrTooltipProps,
  TrTooltipSize,
  TrTooltipTrigger,
} from './components/tooltip';
export { useBreakpoint } from './composables/useBreakpoint';
export type { TrBreakpointName } from './composables/useBreakpoint';
export { color, radius, shadow, spacing, breakpoint, typography } from './tokens';
export type {
  TrColorState,
  TrColorToken,
  TrOutlinePalette,
  TrPalette,
  TrRadiusToken,
  TrShadowToken,
  TrSpacingToken,
  TrBreakpointToken,
  TrResponsiveType,
  TrTypeStyle,
  TrTypographyToken,
} from './tokens';
