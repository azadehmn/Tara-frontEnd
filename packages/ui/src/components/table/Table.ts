import type { TrBreakpointName } from '../../composables/useBreakpoint';

export type TrTableColumn = {
  /** Stable column id; falls back to `name`. */
  id?: number | string;
  /** Row field (supports nested paths like `wallet.title`). */
  name: string;
  label: string;
  /** CSS grid track, e.g. `140px` or `minmax(120px, 1fr)`. */
  width?: string;
  class?: string;
};

export type TrTableRow = Record<string, unknown>;

export type TrTableLayout = 'auto' | 'table' | 'card';

export type TrTableProps<T extends TrTableRow = TrTableRow> = {
  columns: TrTableColumn[];
  items?: T[];
  loading?: boolean;
  /** Skeleton rows while `loading` is true. */
  loadingRowCount?: number;
  hideHeader?: boolean;
  rowPointer?: boolean;
  emptyText?: string;
  /** Property used as Vue key; defaults to `id`, then row index. */
  rowKey?: string;
  /** Optional class for a row; decided by the UI, not the data model. */
  rowClass?: (item: T) => string | undefined;
  /** Grid track for the built-in `#action` column. */
  actionWidth?: string;
  /**
   * Viewport layout. `auto` shows cards below `cardBreakpoint`.
   * Default `auto`.
   */
  layout?: TrTableLayout;
  /** Switch to cards when width is below this Tara token. Default `lg` (912px). */
  cardBreakpoint?: TrBreakpointName;
  /** Column `name` used as the card header. Defaults to the first column. */
  cardHeaderColumn?: string;
};

export type TrTableRowHoverPayload<T extends TrTableRow = TrTableRow> = {
  item: T;
  index: number;
  hovering: boolean;
};

export function resolvePathValue(path: string, item: TrTableRow): unknown {
  if (!path.includes('.')) {
    return item[path];
  }

  const keys = path.split('.');
  let current: unknown = item;

  for (const key of keys) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

export function itemTextContent(column: string, item: TrTableRow): string {
  const content = resolvePathValue(column, item);
  if (content == null || content === '') return '';
  if (Array.isArray(content)) return content.join(', ');
  return String(content);
}

export function columnSlotName(column: TrTableColumn): `column-${string}` {
  return `column-${column.name.toLowerCase()}`;
}

export function itemSlotName(column: TrTableColumn): `item-${string}` {
  return `item-${column.name.toLowerCase()}`;
}

export function getRowKey(item: TrTableRow, index: number, rowKey = 'id'): string | number {
  const value = item[rowKey];
  if (typeof value === 'string' || typeof value === 'number') return value;
  return index;
}
