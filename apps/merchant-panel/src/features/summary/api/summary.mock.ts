import type { MerchantSummaryEnvelopeDto } from '../model/summary';

export const summaryMock: MerchantSummaryEnvelopeDto = {
  data: {
    previousWeekSales: 245_000_000,
    previousMonthSales: 980_000_000,
    previousYearSales: 11_200_000_000,
    totalTransactions: 1842,
    returnedTransactions: 37,
    dailySales: 18_500_000,
    withdrawableBalance: 325_000_000,
  },
};
