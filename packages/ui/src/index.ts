/**
 * Tara UI kit public API.
 * Template tags after `app.use(taraUi)`: TrButton, TrTable, …
 */
export { taraUi } from './plugin';
export { TrAction } from './components/action';
export type { TrActionItem, TrActionProps, TrActionTone } from './components/action';
export { TrAvatar } from './components/avatar';
export type { TrAvatarProps, TrAvatarShape, TrAvatarSize, TrAvatarType } from './components/avatar';
export { TrAvatarType } from './components/avatar';
export { TrButton } from './components/button';
export { TrIcon } from './components/icon';
export type { TrIconProps, TrIconSize } from './components/icon';
export { TrInlineMessage } from './components/inline-message';
export type { TrInlineMessageProps, TrInlineMessageType } from './components/inline-message';
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
  toTableSlotColumn,
} from './components/table';
export type {
  TrTableColumn,
  TrTableLayout,
  TrTableProps,
  TrTableRow,
  TrTableRowHoverPayload,
  TrTableSlotColumn,
} from './components/table';
export { TrTextField } from './components/text-field';
export { TrTextarea } from './components/textarea';
export type {
  TrTextareaHelper,
  TrTextareaHelperType,
  TrTextareaProps,
} from './components/textarea';
export type {
  TrTextFieldDirection,
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
export { TrOtpField } from './components/otp-field';
export type { TrOtpFieldHelper, TrOtpFieldProps } from './components/otp-field';
export { sanitizeOtpValue } from './components/otp-field';
export { TrEmptyState, emptyVectorNames } from './components/empty-state';
export type { TrEmptyStateProps, TrEmptyVectorName } from './components/empty-state';
export { TrPageHeading, TR_PAGE_BACK } from './components/page-heading';
export type { TrPageHeadingProps, TrPageHeadingStatus } from './components/page-heading';
export { TrAccordion } from './components/accordion';
export type { TrAccordionIconPosition, TrAccordionProps } from './components/accordion';
export { TrNavLink } from './components/nav-link';
export type { TrNavLinkProps } from './components/nav-link';
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
