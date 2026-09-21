import { describe, expect, it } from 'vitest';
import { ticketsMock } from '../tickets.mock';
import { mapTicketListResponse } from './ticket.mapper';

describe('mapTicketListResponse', () => {
  it('maps the tickets list envelope', () => {
    const result = mapTicketListResponse(ticketsMock);

    expect(result.data[0]).toMatchObject({
      id: '1403020700128558',
      title: 'توقف قابلیت لینک پرداخت برای درگاه‌های غیراختصاصی',
      status: 'CLOSED',
      feedbackValue: 5,
      user: { id: '356089', fullName: 'کاربر تست' },
    });
    expect(result.meta.pagination).toEqual({
      page: 1,
      pageSize: 15,
      totalItems: 209,
      totalPages: 14,
    });
  });

  it('keeps a missing user and feedback as null', () => {
    const result = mapTicketListResponse({
      data: [
        {
          id: '1',
          title: 'Sample',
          status: 'OPEN',
          updatedAt: '2026-09-21T11:31:18+03:30',
          feedbackValue: null,
          user: null,
        },
      ],
      meta: { pagination: { page: 1, pageSize: 15, totalItems: 1, totalPages: 1 } },
    });

    expect(result.data[0]?.user).toBeNull();
    expect(result.data[0]?.feedbackValue).toBeNull();
  });
});
