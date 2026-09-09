export type TrNavigationMode = 'overlay' | 'collapsed' | 'expanded';

export type TrNavigationBarProps = {
  /** Component presentation: overlay drawer, icon-only, or icon + label. */
  mode: TrNavigationMode;
  /** Overlay drawer visibility. Ignored unless `mode` is `overlay`. */
  open?: boolean;
  ariaLabel?: string;
  closeLabel?: string;
};
