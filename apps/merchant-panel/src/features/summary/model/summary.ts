export interface MerchantSummary {
  previousWeekSales: number;
  previousMonthSales: number;
  previousYearSales: number;
  todaySuccessfulTransactionsAmount: number;
  todaySuccessfulTransactionsCount: number;
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
