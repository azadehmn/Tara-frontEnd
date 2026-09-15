import { clubClient } from '@shared/api/clients/club.client';
import { INCOME_CHART_USE_MOCK } from '../config/data-source';
import type { IncomeChart, IncomeChartPeriod } from '../model/income-chart';
import { incomeEndpoints } from './endpoints';
import { monthlyIncomeChartMock, weeklyIncomeChartMock } from './income-chart.mock';
import { mapIncomeChart } from './mappers/income-chart.mapper';

export async function getIncomeChart(period: IncomeChartPeriod): Promise<IncomeChart> {
  const payload = INCOME_CHART_USE_MOCK
    ? readIncomeChartMock(period)
    : await clubClient.get<unknown>(incomeEndpoints.chart, {
        query: { period },
      });

  return mapIncomeChart(payload);
}

function readIncomeChartMock(period: IncomeChartPeriod) {
  return period === 'WEEKLY' ? weeklyIncomeChartMock : monthlyIncomeChartMock;
}
