export interface WeeklyPerformancePoint {
  date: string;
  salesAmount: number;
  successfulTransactionsCount: number;
  returnRate: number;
}

export interface WeeklyPerformancePeriod {
  from: string;
  to: string;
  salesAmount: number;
  successfulTransactionsCount: number;
  returnedTransactionsCount: number;
  returnRate: number;
}

export interface CurrentWeeklyPerformance extends WeeklyPerformancePeriod {
  items: WeeklyPerformancePoint[];
}

export interface WeeklyPerformance {
  current: CurrentWeeklyPerformance;
  previous: WeeklyPerformancePeriod;
}

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
  weeklyPerformance: WeeklyPerformance;
}

export interface MerchantSummaryEnvelopeDto {
  data: MerchantSummary;
}
