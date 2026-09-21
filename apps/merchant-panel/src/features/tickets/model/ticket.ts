export interface TicketUser {
  id: string;
  fullName: string;
}

export interface Ticket {
  id: string;
  title: string;
  status: string;
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
