export interface Paginated<T> {
  items: T[];
  total: number;
}
// --------------------------------------------------------------------------------------------------------------------
//*
//  unknown backend response
//         ↓
// normalize pagination structure
//         ↓
// unknown[]
//         ↓
// mapper validates/maps each item
//         ↓
// ContractListItem[]
//*
// -----------------------------------------------------------------------------------------------------------------------

export function normalizePage<T>(payload: unknown): Paginated<T> {
  const items = extractItems<T>(payload);
  const total = extractTotal(payload, items.length);
  return { items, total };
}

function extractItems<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  const record = asRecord(payload);
  if (!record) return [];

  if (Array.isArray(record.items)) return record.items as T[];
  if (Array.isArray(record.content)) return record.content as T[];
  if (Array.isArray(record.data)) return record.data as T[];

  const nested = asRecord(record.data);
  if (Array.isArray(nested?.items)) return nested.items as T[];
  if (Array.isArray(nested?.content)) return nested.content as T[];

  return [];
}

function extractTotal(payload: unknown, fallback: number): number {
  const record = asRecord(payload);
  if (!record) return fallback;

  const candidates = [
    record.totalElements,
    record.total,
    asRecord(record.data)?.totalElements,
    asRecord(record.data)?.total,
  ];

  for (const candidate of candidates) {
    const value = Number(candidate);
    if (Number.isFinite(value)) return value;
  }

  return fallback;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
