import type {
  IncomeChart,
  IncomeChartPeriod,
  IncomeChartPoint,
  IncomeChartSeries,
} from '../../model/income-chart';

export function mapIncomeChart(raw: unknown): IncomeChart {
  const root = asRecord(raw) ?? {};
  const data = asRecord(root.data) ?? root;

  return {
    period: mapPeriod(data.period),
    current: mapSeries(data.current),
    previous: mapSeries(data.previous),
  };
}

function mapPeriod(value: unknown): IncomeChartPeriod {
  return value === 'WEEKLY' ? 'WEEKLY' : 'MONTHLY';
}

function mapSeries(raw: unknown): IncomeChartSeries {
  const row = asRecord(raw) ?? {};
  const items = Array.isArray(row.items) ? row.items.map(mapPoint) : [];

  return {
    from: String(row.from ?? ''),
    to: String(row.to ?? ''),
    totalValue: Number(row.totalValue ?? 0),
    totalCount: Number(row.totalCount ?? 0),
    items,
  };
}

function mapPoint(raw: unknown): IncomeChartPoint {
  const row = asRecord(raw) ?? {};
  return {
    date: String(row.date ?? ''),
    value: Number(row.value ?? 0),
    count: Number(row.count ?? 0),
  };
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}
