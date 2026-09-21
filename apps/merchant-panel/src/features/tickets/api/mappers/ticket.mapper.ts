import {
  isTicketStatus,
  TicketStatus,
  type PaginationMeta,
  type Ticket,
  type TicketListResponse,
  type TicketUser,
} from '../../model/ticket';

export function mapTicketListResponse(raw: unknown): TicketListResponse {
  const root = asRecord(raw) ?? {};
  const data = Array.isArray(root.data) ? root.data.map(mapTicket) : [];
  const meta = asRecord(root.meta);
  const pagination = asRecord(meta?.pagination);

  return {
    data,
    meta: {
      pagination: mapPagination(pagination, data.length),
    },
  };
}

export function mapTicket(raw: unknown): Ticket {
  const row = asRecord(raw) ?? {};

  return {
    id: String(row.id ?? ''),
    title: String(row.title ?? ''),
    status: mapTicketStatus(row.status),
    updatedAt: String(row.updatedAt ?? ''),
    feedbackValue: toNullableNumber(row.feedbackValue),
    user: mapTicketUser(row.user),
  };
}

function mapTicketStatus(value: unknown): TicketStatus {
  if (typeof value === 'string' && isTicketStatus(value)) return value;
  return TicketStatus.NEW;
}

function mapTicketUser(raw: unknown): TicketUser | null {
  const row = asRecord(raw);
  if (!row) return null;

  return {
    id: String(row.id ?? ''),
    fullName: String(row.fullName ?? ''),
    avatar: asOptionalString(row.avatar),
  };
}

function mapPagination(raw: Record<string, unknown> | undefined, itemCount: number): PaginationMeta {
  const page = toPositiveInt(raw?.page, 1);
  const pageSize = toPositiveInt(raw?.pageSize, 15);
  const totalItems = toNonNegativeInt(raw?.totalItems, itemCount);
  const totalPages = toPositiveInt(raw?.totalPages, Math.max(1, Math.ceil(totalItems / pageSize)));

  return { page, pageSize, totalItems, totalPages };
}

function asOptionalString(value: unknown): string | null {
  if (value == null || value === '') return null;
  return String(value);
}

function toNullableNumber(value: unknown): number | null {
  if (value == null || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function toPositiveInt(value: unknown, fallback: number): number {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : fallback;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
