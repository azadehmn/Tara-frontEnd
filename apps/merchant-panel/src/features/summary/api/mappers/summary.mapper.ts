import type { MerchantSummary } from '../../model/summary';

export function mapMerchantSummary(raw: unknown): MerchantSummary {
  const root = asRecord(raw) ?? {};
  const data = asRecord(root.data) ?? root;

  return {
    previousWeekSales: toNumber(data.previousWeekSales),
    previousMonthSales: toNumber(data.previousMonthSales),
    previousYearSales: toNumber(data.previousYearSales),
    totalTransactions: toNumber(data.totalTransactions),
    returnedTransactions: toNumber(data.returnedTransactions),
    dailySales: toNumber(data.dailySales),
    withdrawableBalance: toNumber(data.withdrawableBalance),
  };
}

function toNumber(value: unknown): number {
  return Number(value ?? 0);
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
