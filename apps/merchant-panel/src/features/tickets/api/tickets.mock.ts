import { TicketStatus, type TicketListResponse } from '../model/ticket';

export const ticketsMock: TicketListResponse = {
  data: [
    {
      id: '1403020700128558',
      title: 'توقف قابلیت لینک پرداخت برای درگاه‌های غیراختصاصی',
      status: TicketStatus.CLOSED,
      updatedAt: '2026-09-21T11:31:18+03:30',
      feedbackValue: 5,
      user: {
        id: '356089',
        fullName: 'کاربر تست',
        avatar: null,
      },
    },
    {
      id: '1403020700128559',
      title: 'عدم نمایش مانده اعتبار در پنل پذیرنده',
      status: TicketStatus.NEW,
      updatedAt: '2026-09-20T16:12:04+03:30',
      feedbackValue: null,
      user: {
        id: '356090',
        fullName: 'مریم رضایی',
        avatar: null,
      },
    },
    {
      id: '1403020700128560',
      title: 'خطا در ثبت مرجوعی تراکنش فروشگاهی',
      status: TicketStatus.IN_PROGRESS,
      updatedAt: '2026-09-19T09:44:51+03:30',
      feedbackValue: null,
      user: {
        id: '356091',
        fullName: 'علی محمدی',
        avatar: null,
      },
    },
    {
      id: '1403020700128561',
      title: 'درخواست فعال‌سازی درگاه اختصاصی',
      status: TicketStatus.SUPPORT_RESPONSE,
      updatedAt: '2026-09-18T13:05:22+03:30',
      feedbackValue: null,
      user: null,
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 15,
      totalItems: 209,
      totalPages: 14,
    },
  },
};
