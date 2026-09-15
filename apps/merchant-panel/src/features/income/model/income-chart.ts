export const IncomeChartPeriod = {
  Monthly: 'MONTHLY',
  Weekly: 'WEEKLY',
} as const;

export type IncomeChartPeriod = (typeof IncomeChartPeriod)[keyof typeof IncomeChartPeriod];

export interface IncomeChartPoint {
  date: string;
  value: number;
  count: number;
}

export interface IncomeChartSeries {
  from: string;
  to: string;
  totalValue: number;
  totalCount: number;
  items: IncomeChartPoint[];
}

export interface IncomeChart {
  period: IncomeChartPeriod;
  current: IncomeChartSeries;
  previous: IncomeChartSeries;
}

export interface IncomeChartEnvelopeDto {
  data: IncomeChart;
}
