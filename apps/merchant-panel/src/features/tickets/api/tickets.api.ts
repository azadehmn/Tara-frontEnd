import { clubClient } from '@shared/api/clients/club.client';
import { TICKETS_USE_MOCK } from '../config/data-source';
import type { TicketListQuery, TicketListResponse } from '../model/ticket';
import { ticketEndpoints } from './endpoints';
import { mapTicketListResponse } from './mappers/ticket.mapper';
import { ticketsMock } from './tickets.mock';

export async function listTickets(query: TicketListQuery): Promise<TicketListResponse> {
  const payload = TICKETS_USE_MOCK
    ? readTicketsMock(query)
    : await clubClient.get<unknown>(ticketEndpoints.list, {
        query: {
          page: query.page,
          pageSize: query.pageSize,
        },
      });

  return mapTicketListResponse(payload);
}

function readTicketsMock(query: TicketListQuery): TicketListResponse {
  return {
    data: ticketsMock.data,
    meta: {
      pagination: {
        ...ticketsMock.meta.pagination,
        page: query.page,
        pageSize: query.pageSize,
      },
    },
  };
}
