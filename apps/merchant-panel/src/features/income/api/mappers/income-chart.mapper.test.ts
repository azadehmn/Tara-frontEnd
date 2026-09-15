import { describe, expect, it } from 'vitest';
import { monthlyIncomeChartMock, weeklyIncomeChartMock } from '../income-chart.mock';
import { mapIncomeChart } from './income-chart.mapper';

describe('mapIncomeChart', () => {
  it('unwraps monthly envelope and keeps current/previous series', () => {
    const mapped = mapIncomeChart(monthlyIncomeChartMock);

    expect(mapped.period).toBe('MONTHLY');
    expect(mapped.current.from).toBe('2026-09-01');
    expect(mapped.current.to).toBe('2026-09-15');
    expect(mapped.current.totalValue).toBe(268_700_000);
    expect(mapped.current.items).toHaveLength(15);
    expect(mapped.previous.from).toBe('2026-08-01');
    expect(mapped.previous.to).toBe('2026-08-31');
    expect(mapped.previous.items).toHaveLength(31);
  });

  it('maps weekly envelope with a partial current week', () => {
    const mapped = mapIncomeChart(weeklyIncomeChartMock);

    expect(mapped.period).toBe('WEEKLY');
    expect(mapped.current.items).toHaveLength(4);
    expect(mapped.previous.items).toHaveLength(7);
    expect(mapped.current.totalCount).toBe(161);
  });

  it('accepts an unwrapped payload without a data envelope', () => {
    const mapped = mapIncomeChart(monthlyIncomeChartMock.data);

    expect(mapped.period).toBe('MONTHLY');
    expect(mapped.current.items[0]).toEqual({
      date: '2026-09-01',
      value: 12_500_000,
      count: 34,
    });
  });
});
