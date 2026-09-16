# Summary

Dashboard cards next to the income chart: sales totals, withdrawable balance, and transaction counts.

## API

```text
GET /club/api/merchant/summary
```

```ts
{
  data: {
    previousWeekSales: 245_000_000,
    previousMonthSales: 980_000_000,
    previousYearSales: 11_200_000_000,
    currentWeekSuccessfulTransactionsAmount: 18_500_000,
    currentWeekSuccessfulTransactionsCount: 58,
    currentMonthSuccessfulTransactionsAmount: 405_200_080,
    currentMonthSuccessfulTransactionsCount: 1071,
    totalTransactions: 1842,
    returnedTransactions: 37,
    dailySales: 18_500_000,
    withdrawableBalance: 325_000_000,
    weeklyPerformance: {
      current: {
        from: '2026-09-12',
        to: '2026-09-15',
        salesAmount: 185_000_000,
        successfulTransactionsCount: 1071,
        returnedTransactionsCount: 22,
        returnRate: 2.01,
        items: [
          {
            date: '2026-09-12',
            salesAmount: 42_000_000,
            successfulTransactionsCount: 250,
            returnRate: 2.4,
          },
          // One item per elapsed day of the current week.
        ],
      },
      previous: {
        from: '2026-09-05',
        to: '2026-09-11',
        salesAmount: 164_000_000,
        successfulTransactionsCount: 980,
        returnedTransactionsCount: 28,
        returnRate: 2.78,
      },
    },
  },
}
```

`weeklyPerformance.current.items` is intentionally limited to at most seven rows. The backend
should calculate the aggregates in grouped queries and may cache the response for 30–60 seconds.
For a partial current week, compare against the same elapsed days from the previous week to avoid
misleading trends.

## Mock

Mock data can be enabled from `.env.development`:

```env
VITE_SUMMARY_USE_MOCK=true
```

Set it to `false` to use the API.

## Flow

```text
summary.api → mapper → MerchantSummary → useSummary → PerformanceCard / BalanceCard
```

`useSummary` returns domain data only. Each card decides which fields it displays.

Numbers are formatted with `@shared/utils/format`.

`calculateTrend` only reports the mathematical direction (`increase`, `decrease`, or `neutral`).
`PerformanceCard` assigns business meaning. In the current product rules, an increase is green and
a decrease is red for all three displayed metrics.

## Files

```text
features/summary/
├── api/           API and mock data
├── model/         Types
├── composables/   Data loading
├── config/        Mock/API config
└── ui/            Cards
```
