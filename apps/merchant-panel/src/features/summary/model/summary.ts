export interface MerchantSummary {
  previousWeekSales: number;
  previousMonthSales: number;
  previousYearSales: number;
  currentWeekSuccessfulTransactionsAmount: number;
  currentWeekSuccessfulTransactionsCount: number;
  currentMonthSuccessfulTransactionsAmount: number;
  currentMonthSuccessfulTransactionsCount: number;
  totalTransactions: number;
  returnedTransactions: number;
  dailySales: number;
  withdrawableBalance: number;
}

export interface MerchantSummaryEnvelopeDto {
  data: MerchantSummary;
}
