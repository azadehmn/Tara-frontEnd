import { describe, expect, it } from 'vitest';
import { mapIncomeChart } from '../api/mappers/income-chart.mapper';
import { monthlyIncomeChartMock, weeklyIncomeChartMock } from '../api/income-chart.mock';
import { toIncomeChartPlot } from './to-income-chart-plot';

describe('toIncomeChartPlot', () => {
  it('aligns monthly series by Jalali day of month and pads the current month', () => {
    const plot = toIncomeChartPlot(mapIncomeChart(monthlyIncomeChartMock));

    expect(plot.categories).toHaveLength(31);
    expect(plot.current[0]).toBe(15_200_000);
    expect(plot.previous[0]).toBe(11_200_000);
    expect(plot.current[23]).toBe(17_200_000);
    expect(plot.current[24]).toBeNull();
    expect(plot.previous[30]).toBe(18_000_000);
    expect(plot.currentDates[23]).toBe('2026-09-15');
  });

  it('aligns weekly series on Sat–Fri and leaves later current days empty', () => {
    const plot = toIncomeChartPlot(mapIncomeChart(weeklyIncomeChartMock));

    expect(plot.categories).toEqual(['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri']);
    expect(plot.current[0]).toBe(14_200_000);
    expect(plot.current[3]).toBe(16_500_000);
    expect(plot.current[4]).toBeNull();
    expect(plot.previous[6]).toBe(16_400_000);
  });
});
