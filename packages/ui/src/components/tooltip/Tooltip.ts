export type TrTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TrTooltipTrigger = 'auto' | 'hover' | 'click';

export type TrTooltipSize = 'small' | 'medium';

export type TrTooltipProps = {
  content?: string;
  placement?: TrTooltipPlacement;
  position?: TrTooltipPlacement;
  trigger?: TrTooltipTrigger;
  size?: TrTooltipSize;
  arrow?: boolean;
  disabled?: boolean;
  onlyWhenTruncated?: boolean;
  /** Stops a click which opens the tooltip from reaching parent controls. */
  stopTriggerClick?: boolean;
  /** Maximum tooltip width in CSS units. */
  maxWidth?: string;
};
