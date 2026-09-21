export interface TicketUser {
  id: string;
  fullName: string;
  avatar: string | null;
}

export const TicketStatus = {
  NEW: 'NEW',
  IN_PROGRESS: 'IN_PROGRESS',
  SUPPORT_RESPONSE: 'SUPPORT_RESPONSE',
  CLOSED: 'CLOSED',
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TICKET_STATUSES = Object.values(TicketStatus);

export function isTicketStatus(value: string): value is TicketStatus {
  return (TICKET_STATUSES as string[]).includes(value);
}

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  updatedAt: string;
  feedbackValue: number | null;
  user: TicketUser | null;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface TicketListResponse {
  data: Ticket[];
  meta: {
    pagination: PaginationMeta;
  };
}

export interface TicketListQuery {
  page: number;
  pageSize: number;
}
