# Income Chart

Income chart used on the dashboard to compare the current period with the previous one.

It supports `MONTHLY` and `WEEKLY`. The default is `MONTHLY`.

## API

```text id="ux3a2f"
GET /club/api/dashboard/income-chart?period=MONTHLY
GET /club/api/dashboard/income-chart?period=WEEKLY
```

Dates from the API are Gregorian (`YYYY-MM-DD`), but month and week ranges are based on the Jalali calendar.

### Monthly

If today is `2026-09-15` (24 Shahrivar):

```text id="s8z7jk"
current:  2026-08-23 → 2026-09-15
previous: 2026-07-23 → 2026-08-22
```

`current` is from the first day of the current Jalali month until today.

`previous` is the full previous Jalali month.

### Weekly

The week starts on Saturday and ends on Friday.

```text id="gx7nb2"
current:  2026-09-12 → 2026-09-15
previous: 2026-09-05 → 2026-09-11
```

`current` is from Saturday until today.

`previous` is the full previous week.

## Mock

Mock data can be enabled from `.env.development`:

```env id="7e4pwc"
VITE_INCOME_CHART_USE_MOCK=true
```

Set it to `false` to use the API.

Example monthly response:

```ts id="p5ct0e"
{
  data: {
    period: 'MONTHLY',
    current: {
      from: '2026-08-23',
      to: '2026-09-15',
      totalValue: 405_200_000,
      totalCount: 1071,
      items: [
        { date: '2026-08-23', value: 15_200_000, count: 31 },
        { date: '2026-08-24', value: 13_900_000, count: 36 },
        // ...
        { date: '2026-09-15', value: 17_200_000, count: 58 },
      ],
    },
    previous: {
      from: '2026-07-23',
      to: '2026-08-22',
      totalValue: 514_600_000,
      totalCount: 1346,
      items: [
        { date: '2026-07-23', value: 11_200_000, count: 31 },
        { date: '2026-07-24', value: 13_500_000, count: 36 },
        // ...
        { date: '2026-08-22', value: 18_000_000, count: 47 },
      ],
    },
  },
}
```

Example weekly response:

```ts id="0rqvcs"
{
  data: {
    period: 'WEEKLY',
    current: {
      from: '2026-09-12',
      to: '2026-09-15',
      totalValue: 61_200_000,
      totalCount: 161,
      items: [
        { date: '2026-09-12', value: 14_200_000, count: 38 },
        { date: '2026-09-13', value: 16_800_000, count: 43 },
        { date: '2026-09-14', value: 13_700_000, count: 36 },
        { date: '2026-09-15', value: 16_500_000, count: 44 },
      ],
    },
    previous: {
      from: '2026-09-05',
      to: '2026-09-11',
      totalValue: 103_300_000,
      totalCount: 272,
      items: [
        { date: '2026-09-05', value: 12_800_000, count: 35 },
        { date: '2026-09-06', value: 14_900_000, count: 39 },
        { date: '2026-09-07', value: 12_100_000, count: 33 },
        { date: '2026-09-08', value: 15_800_000, count: 42 },
        { date: '2026-09-09', value: 16_700_000, count: 44 },
        { date: '2026-09-10', value: 14_600_000, count: 38 },
        { date: '2026-09-11', value: 16_400_000, count: 41 },
      ],
    },
  },
}
```

## Files

```text id="q35k2m"
features/income/
├── api/           API and mock data
├── model/         Types
├── composables/   Data and chart logic
├── lib/           Date and chart helpers
├── config/        Mock/API config
└── ui/            Chart UI
```

- `useIncomeChart` handles data loading and period changes.
- `to-income-chart-plot` aligns current and previous data.
- `useIncomeChartSeries` prepares the ApexCharts series and options.
- `IncomeChartCard` renders the chart.

For monthly view, data is aligned by Jalali day of month.

For weekly view, data is aligned from Saturday to Friday.

Chart colors come from `color.chart.current` and `color.chart.previous`.
