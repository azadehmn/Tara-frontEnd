export type TrActionItem = {
  id: number | string;
  label: string;
  command: () => void;
  disabled?: boolean;
  /** When false, the item is omitted. Defaults to true. */
  active?: boolean;
};

export type TrActionProps = {
  items: TrActionItem[];
  /** Required for the icon-only trigger. */
  ariaLabel?: string;
};
