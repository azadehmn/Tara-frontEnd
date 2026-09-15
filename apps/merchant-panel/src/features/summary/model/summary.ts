export interface MerchantSummary {
  previousWeekSales: number;
  previousMonthSales: number;
  previousYearSales: number;
  totalTransactions: number;
  returnedTransactions: number;
  dailySales: number;
  withdrawableBalance: number;
}

export interface MerchantSummaryEnvelopeDto {
  data: MerchantSummary;
}
