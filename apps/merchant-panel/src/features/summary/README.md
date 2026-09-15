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
    todaySuccessfulTransactionsAmount: 18_500_000,
    todaySuccessfulTransactionsCount: 58,
    currentMonthSuccessfulTransactionsAmount: 405_200_080,
    currentMonthSuccessfulTransactionsCount: 1071,
    totalTransactions: 1842,
    returnedTransactions: 37,
    dailySales: 18_500_000,
    withdrawableBalance: 325_000_000,
  },
}
```

## Mock

Mock data can be enabled from `.env.development`:

```env
VITE_SUMMARY_USE_MOCK=true
```

Set it to `false` to use the API.

## Flow

```text
summary.api → mapper → MerchantSummary → useSummary → SalesCard / BalanceCard
```

`useSummary` returns domain data only. Each card decides which fields it shows and builds its own
rows. `SummaryCard` is the shared shell: title, one highlighted value, and a list of rows.

Numbers are formatted with `@shared/utils/format`.

## Files

```text
features/summary/
├── api/           API and mock data
├── model/         Types
├── composables/   Data loading
├── config/        Mock/API config
└── ui/            Cards
```
