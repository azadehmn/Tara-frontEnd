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

export type TrTableRow = object;

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
  /** Grid track for the built-in `#action` column. */
  actionWidth?: string;
};

export type TrTableRowHoverPayload<T extends TrTableRow = TrTableRow> = {
  item: T;
  index: number;
  hovering: boolean;
};

function asRecord(item: TrTableRow): Record<string, unknown> {
  return item as Record<string, unknown>;
}

export function getItemValue(column: string, item: TrTableRow): unknown {
  const record = asRecord(item);
  if (!column.includes('.')) {
    return record[column];
  }

  const keys = column.split('.');
  let current: unknown = record;

  for (const key of keys) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }

  return current;
}

export function itemTextContent(column: string, item: TrTableRow): string {
  const content = getItemValue(column, item);
  if (content == null || content === '') return '';
  if (Array.isArray(content)) return content.join(', ');
  return String(content);
}

export function columnSlotName(column: TrTableColumn): string {
  return `column-${column.name.toLowerCase()}`;
}

export function itemSlotName(column: TrTableColumn): string {
  return `item-${column.name.toLowerCase()}`;
}

export function rowIdentity(item: TrTableRow, index: number, rowKey = 'id'): string | number {
  const value = asRecord(item)[rowKey];
  if (typeof value === 'string' || typeof value === 'number') return value;
  return index;
}

export function rowClassName(item: TrTableRow): string | undefined {
  const value = asRecord(item).class;
  return typeof value === 'string' ? value : undefined;
}
