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
  });

  it('falls back to zero for missing fields', () => {
    const mapped = mapMerchantSummary({ data: { dailySales: 500 } });

    expect(mapped.dailySales).toBe(500);
    expect(mapped.withdrawableBalance).toBe(0);
    expect(mapped.currentWeekSuccessfulTransactionsAmount).toBe(0);
    expect(mapped.currentMonthSuccessfulTransactionsCount).toBe(0);
  });
});
