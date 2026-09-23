export type TrTabAlign = 'start' | 'end';

export type TrTabItem = {
  value: string;
  label: string;
  /** Blue dot beside the label. */
  isNotif?: boolean;
  /** Unread count drawn on the item icon. */
  count?: number;
  /** Renders the icon slot and places `count` on that icon. */
  icon?: boolean;
  loading?: boolean;
};

export type TrTabProps = {
  items: TrTabItem[];
  modelValue: string;
  align?: TrTabAlign;
  block?: boolean;
  hasBorder?: boolean;
};
