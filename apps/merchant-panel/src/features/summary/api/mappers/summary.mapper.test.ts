import { describe, expect, it } from 'vitest';
import { summaryMock } from '../summary.mock';
import { mapMerchantSummary } from './summary.mapper';

describe('mapMerchantSummary', () => {
  it('unwraps the data envelope', () => {
    const mapped = mapMerchantSummary(summaryMock);

    expect(mapped).toEqual(summaryMock.data);
  });

  it('accepts an unwrapped payload without a data envelope', () => {
    const mapped = mapMerchantSummary(summaryMock.data);

    expect(mapped.dailySales).toBe(18_500_000);
    expect(mapped.totalTransactions).toBe(1842);
    expect(mapped.currentWeekSuccessfulTransactionsCount).toBe(58);
    expect(mapped.currentMonthSuccessfulTransactionsAmount).toBe(405_200_080);
    expect(mapped.weeklyPerformance.current.items).toHaveLength(4);
    expect(mapped.weeklyPerformance.previous.returnRate).toBe(2.78);
  });

  it('reads yesterday sales when the API sends that field', () => {
    const mapped = mapMerchantSummary({ data: { dailySales: 500, yesterdaySales: 900 } });

    expect(mapped.dailySales).toBe(900);
  });

  it('falls back to zero for missing fields', () => {
    const mapped = mapMerchantSummary({ data: { dailySales: 500 } });

    expect(mapped.dailySales).toBe(500);
    expect(mapped.transactionsAmount).toBe(0);
    expect(mapped.returnedTransactionsAmount).toBe(0);
    expect(mapped.currentYearSales).toBe(0);
    expect(mapped.withdrawableBalance).toBe(0);
    expect(mapped.currentWeekSuccessfulTransactionsAmount).toBe(0);
    expect(mapped.currentMonthSuccessfulTransactionsCount).toBe(0);
    expect(mapped.weeklyPerformance.current.items).toEqual([]);
    expect(mapped.weeklyPerformance.previous.salesAmount).toBe(0);
  });

  it('sorts weekly points and normalizes invalid numbers', () => {
    const mapped = mapMerchantSummary({
      data: {
        weeklyPerformance: {
          current: {
            from: '2026-09-12',
            to: '2026-09-14',
            salesAmount: 'invalid',
            items: [
              { date: '2026-09-14', salesAmount: 20 },
              { date: '2026-09-12', salesAmount: 10 },
            ],
          },
        },
      },
    });

    expect(mapped.weeklyPerformance.current.salesAmount).toBe(0);
    expect(mapped.weeklyPerformance.current.items.map((item) => item.date)).toEqual([
      '2026-09-12',
      '2026-09-13',
      '2026-09-14',
    ]);
    expect(mapped.weeklyPerformance.current.items[1]?.salesAmount).toBe(0);
  });
});
