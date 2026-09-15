import type { IncomeChart, IncomeChartPoint } from '../model/income-chart';
import { jalaliDayOfMonth } from '../lib/jalali-day';

export const incomeWeekdayKeys = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'] as const;

export type IncomeWeekdayKey = (typeof incomeWeekdayKeys)[number];

export type IncomeChartPlot = {
  categories: string[];
  current: Array<number | null>;
  previous: Array<number | null>;
  currentDates: Array<string | null>;
  previousDates: Array<string | null>;
};

/** Aligns backend series onto a shared x-axis. Monthly uses Jalali day-of-month; weekly uses Sat–Fri. */
export function toIncomeChartPlot(chart: IncomeChart): IncomeChartPlot {
  return chart.period === 'WEEKLY' ? alignWeekly(chart) : alignMonthly(chart);
}

function alignMonthly(chart: IncomeChart): IncomeChartPlot {
  const currentByDay = indexByJalaliDay(chart.current.items);
  const previousByDay = indexByJalaliDay(chart.previous.items);
  const lastDay = Math.max(maxJalaliDay(chart.current.items), maxJalaliDay(chart.previous.items), 1);
  const categories = Array.from({ length: lastDay }, (_, index) => String(index + 1));

  return {
    categories,
    current: categories.map((_, index) => currentByDay.get(index + 1)?.value ?? null),
    previous: categories.map((_, index) => previousByDay.get(index + 1)?.value ?? null),
    currentDates: categories.map((_, index) => currentByDay.get(index + 1)?.date ?? null),
    previousDates: categories.map((_, index) => previousByDay.get(index + 1)?.date ?? null),
  };
}

function alignWeekly(chart: IncomeChart): IncomeChartPlot {
  const currentByWeekday = indexByWeekday(chart.current.items);
  const previousByWeekday = indexByWeekday(chart.previous.items);

  return {
    categories: [...incomeWeekdayKeys],
    current: incomeWeekdayKeys.map((_, index) => currentByWeekday.get(index)?.value ?? null),
    previous: incomeWeekdayKeys.map((_, index) => previousByWeekday.get(index)?.value ?? null),
    currentDates: incomeWeekdayKeys.map((_, index) => currentByWeekday.get(index)?.date ?? null),
    previousDates: incomeWeekdayKeys.map((_, index) => previousByWeekday.get(index)?.date ?? null),
  };
}

function indexByJalaliDay(items: IncomeChartPoint[]): Map<number, IncomeChartPoint> {
  const values = new Map<number, IncomeChartPoint>();
  for (const item of items) {
    values.set(jalaliDayOfMonth(item.date), item);
  }
  return values;
}

function indexByWeekday(items: IncomeChartPoint[]): Map<number, IncomeChartPoint> {
  const values = new Map<number, IncomeChartPoint>();
  for (const item of items) {
    values.set(iranWeekdayIndex(item.date), item);
  }
  return values;
}

function maxJalaliDay(items: IncomeChartPoint[]): number {
  return items.reduce((max, item) => Math.max(max, jalaliDayOfMonth(item.date)), 0);
}

/** Saturday = 0 … Friday = 6 (Iran business week). */
function iranWeekdayIndex(isoDate: string): number {
  const weekday = new Date(`${isoDate}T00:00:00Z`).getUTCDay();
  return (weekday + 1) % 7;
}
