import type {
  CurrentWeeklyPerformance,
  MerchantSummary,
  WeeklyPerformance,
  WeeklyPerformancePeriod,
  WeeklyPerformancePoint,
} from '../../model/summary';



  /*--------------------------------------------------------------------------------
    mapMerchantSummary
    │
    ├── numeric fields → toNumber
    │
    └── weeklyPerformance → mapWeeklyPerformance
                            │
                            ├── current → mapCurrentWeeklyPeriod
                            │             ├── summary → mapWeeklyPeriod
                            │             └── items → mapWeeklyPoint
                            │
                            └── previous → mapWeeklyPeriod
 -------------------------------------------------------------------------------- */
export function mapMerchantSummary(raw: unknown): MerchantSummary {
  const root = asRecord(raw) ?? {};
  const data = asRecord(root.data) ?? root;
  //   "1200"    -> 1200
  //   1200      -> 1200
  //   null      -> 0
  //   undefined -> 0
  //  "abc"     -> 0
  return {
    previousWeekSales: toNumber(data.previousWeekSales),
    previousMonthSales: toNumber(data.previousMonthSales),
    previousYearSales: toNumber(data.previousYearSales),
    currentWeekSuccessfulTransactionsAmount: toNumber(data.currentWeekSuccessfulTransactionsAmount),
    currentWeekSuccessfulTransactionsCount: toNumber(data.currentWeekSuccessfulTransactionsCount),
    currentMonthSuccessfulTransactionsAmount: toNumber(
      data.currentMonthSuccessfulTransactionsAmount,
    ),
    currentMonthSuccessfulTransactionsCount: toNumber(data.currentMonthSuccessfulTransactionsCount),
    totalTransactions: toNumber(data.totalTransactions),
    transactionsAmount: toNumber(data.transactionsAmount),
    returnedTransactions: toNumber(data.returnedTransactions),
    returnedTransactionsAmount: toNumber(data.returnedTransactionsAmount),
    dailySales: toNumber(data.yesterdaySales ?? data.dailySales),
    currentYearSales: toNumber(data.currentYearSales),
    withdrawableBalance: toNumber(data.withdrawableBalance),
    weeklyPerformance: mapWeeklyPerformance(data.weeklyPerformance),
  };
}

/*--------------------------------------------------------------------------------
  Map current and previous weekly performance data.
 -------------------------------------------------------------------------------- */
function mapWeeklyPerformance(raw: unknown): WeeklyPerformance {
  const data = asRecord(raw) ?? {};

  return {
    current: mapCurrentWeeklyPeriod(data.current),
    previous: mapWeeklyPeriod(data.previous),
  };
}

/*--------------------------------------------------------------------------------
  Map the current week summary and its daily performance data.
 -------------------------------------------------------------------------------- */
function mapCurrentWeeklyPeriod(raw: unknown): CurrentWeeklyPerformance {
  const data = asRecord(raw) ?? {};
  const items = Array.isArray(data.items) ? data.items.map(mapWeeklyPoint) : [];
  const period = mapWeeklyPeriod(data);

  return {
    ...period,
    items: fillMissingDays(period.from, period.to, items),
  };
}
/*--------------------------------------------------------------------------------
   Map the overall performance summary for a weekly period.
 -------------------------------------------------------------------------------- */
function mapWeeklyPeriod(raw: unknown): WeeklyPerformancePeriod {
  const data = asRecord(raw) ?? {};

  return {
    from: String(data.from ?? ''),
    to: String(data.to ?? ''),
    salesAmount: toNumber(data.salesAmount),
    successfulTransactionsCount: toNumber(data.successfulTransactionsCount),
    returnedTransactionsCount: toNumber(data.returnedTransactionsCount),
    returnRate: toNumber(data.returnRate),
  };
}

/*--------------------------------------------------------------------------------
  Map the performance data for a single day.
 -------------------------------------------------------------------------------- */
function mapWeeklyPoint(raw: unknown): WeeklyPerformancePoint {
  const data = asRecord(raw) ?? {};
  // Map a daily performance item to the frontend model.
  return {
    date: String(data.date ?? ''),
    salesAmount: toNumber(data.salesAmount),
    successfulTransactionsCount: toNumber(data.successfulTransactionsCount),
    returnRate: toNumber(data.returnRate),
  };
}
/* --------------------------------------------------------------------------------
  Fill missing days with zero values to keep the weekly data continuous.
  --------------------------------------------------------------------------------*/

function fillMissingDays(
  from: string,
  to: string,
  items: WeeklyPerformancePoint[],
): WeeklyPerformancePoint[] {
  // sort time for example['2026-09-14', '2026-09-12', '2026-09-13'] convert to ['2026-09-12', '2026-09-13', '2026-09-14']
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  if (!start || !end || start > end) return sorted;
  // Sort items by date and prepare them for filling missing days.
  const byDate = new Map(sorted.map((item) => [item.date, item]));
  const result: WeeklyPerformancePoint[] = [];

  for (
    const date = start;
    date <= end && result.length < 7;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const iso = date.toISOString().slice(0, 10);
    result.push(
      byDate.get(iso) ?? {
        date: iso,
        salesAmount: 0,
        successfulTransactionsCount: 0,
        returnRate: 0,
      },
    );
  }

  return result;
}
/* --------------------------------------------------------------------------------
 // Parse an ISO date string as a UTC date.
  --------------------------------------------------------------------------------*/
function parseIsoDate(value: string): Date | undefined {
  // accept YYYY-MM-DD format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  // '2026-09-12' convert '2026-09-12T00:00:00.000Z' -> Date
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function toNumber(value: unknown): number {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
