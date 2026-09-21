import { ref } from 'vue';
import { ApiError } from '@shared/api/errors/api-error';
import { listTickets } from '../api/tickets.api';
import type { PaginationMeta, Ticket } from '../model/ticket';

const DEFAULT_PAGE_SIZE = 15;

export function useTicketList() {
  const tickets = ref<Ticket[]>([]);
  const pagination = ref<PaginationMeta>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    totalItems: 0,
    totalPages: 1,
  });
  const page = ref(1);
  const pageSize = ref(DEFAULT_PAGE_SIZE);
  const pending = ref(false);
  const error = ref<ApiError | null>(null);

  async function fetch(resetPage = false): Promise<void> {
    if (resetPage) page.value = 1;
    pending.value = true;
    error.value = null;
    try {
      const result = await listTickets({
        page: page.value,
        pageSize: pageSize.value,
      });
      tickets.value = result.data;
      pagination.value = result.meta.pagination;
      page.value = result.meta.pagination.page;
      pageSize.value = result.meta.pagination.pageSize;
    } catch (cause) {
      error.value = cause instanceof ApiError ? cause : new ApiError(String(cause));
      tickets.value = [];
      pagination.value = {
        page: page.value,
        pageSize: pageSize.value,
        totalItems: 0,
        totalPages: 1,
      };
    } finally {
      pending.value = false;
    }
  }

  return { tickets, pagination, page, pageSize, pending, error, fetch };
}
