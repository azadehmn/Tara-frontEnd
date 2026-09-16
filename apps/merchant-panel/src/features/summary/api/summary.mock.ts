import type { MerchantSummaryEnvelopeDto } from '../model/summary';

export const summaryMock: MerchantSummaryEnvelopeDto = {
  data: {
    previousWeekSales: 245_000_000,
    previousMonthSales: 980_000_000,
    previousYearSales: 11_200_000_000,
    currentWeekSuccessfulTransactionsAmount: 18_500_000,
    currentWeekSuccessfulTransactionsCount: 58,
    currentMonthSuccessfulTransactionsAmount: 405_200_080,
    currentMonthSuccessfulTransactionsCount: 1071,
    totalTransactions: 1842,
    returnedTransactions: 37,
    dailySales: 18_500_000,
    withdrawableBalance: 325_000_000,
    weeklyPerformance: {
      current: {
        from: '2026-09-12',
        to: '2026-09-15',
        salesAmount: 185_000_000,
        successfulTransactionsCount: 1071,
        returnedTransactionsCount: 22,
        returnRate: 2.01,
        items: [
          {
            date: '2026-09-12',
            salesAmount: 42_000_000,
            successfulTransactionsCount: 250,
            returnRate: 2.4,
          },
          {
            date: '2026-09-13',
            salesAmount: 47_000_000,
            successfulTransactionsCount: 273,
            returnRate: 2.2,
          },
          {
            date: '2026-09-14',
            salesAmount: 51_000_000,
            successfulTransactionsCount: 281,
            returnRate: 1.7,
          },
          {
            date: '2026-09-15',
            salesAmount: 45_000_000,
            successfulTransactionsCount: 267,
            returnRate: 1.8,
          },
        ],
      },
      previous: {
        from: '2026-09-05',
        to: '2026-09-11',
        salesAmount: 164_000_000,
        successfulTransactionsCount: 980,
        returnedTransactionsCount: 28,
        returnRate: 2.78,
      },
    },
  },
};
