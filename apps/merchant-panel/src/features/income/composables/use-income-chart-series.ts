import { computed, onMounted, onUnmounted, ref, toValue, type MaybeRefOrGetter } from 'vue';
import type { ApexOptions } from 'apexcharts';
import { color } from '@tara/ui';
import type { IncomeChart } from '../model/income-chart';
import { formatIncomeChartDate, formatIncomeChartDateRange, formatIncomeChartDayInMonth, toSupportedLocale } from '../lib/format-income-date';
import { toIncomeChartPlot, type IncomeWeekdayKey } from './to-income-chart-plot';

const CURRENT_COLOR = color.chart.current;
const PREVIOUS_COLOR = color.chart.previous;
const TABLE_BORDER_LIGHT = '#e4e7ec';
const TABLE_BORDER_DARK = '#1d2939';

const INCOME_CHART_LINES = [
  { key: 'previous', nameKey: 'income.chart.previous', color: PREVIOUS_COLOR },
  { key: 'current', nameKey: 'income.chart.current', color: CURRENT_COLOR },
] as const;

export function useIncomeChartSeries(chart: MaybeRefOrGetter<IncomeChart | null>) {
  const { t, locale } = useI18n();
  const isDark = useDocumentTheme();
  const appLocale = computed(() => toSupportedLocale(locale.value));

  const plot = computed(() => {
    const value = toValue(chart);
    return value ? toIncomeChartPlot(value) : null;
  });

  const categories = computed(() => {
    if (!plot.value) return [];
    const data = toValue(chart);
    if (data?.period === 'WEEKLY') {
      return plot.value.categories.map((key) => t(`income.chart.weekdays.${key as IncomeWeekdayKey}`));
    }

    return plot.value.categories.map((day) => {
      const dayNumber = Number(day);
      if (!shouldShowMonthDayLabel(dayNumber)) return '';
      return dayNumber.toLocaleString(appLocale.value === 'fa' ? 'fa-IR' : 'en-US');
    });
  });

  const series = computed(() => {
    const data = plot.value;
    if (!data) return [];
    return INCOME_CHART_LINES.map((line) => ({
      name: t(line.nameKey),
      data: data[line.key],
    }));
  });

  const rangeLabel = computed(() => {
    const data = toValue(chart);
    if (!data) return '';
    return formatIncomeChartDateRange(data.current.from, data.current.to, appLocale.value);
  });

  const tooltipLabels = computed(() => {
    if (!plot.value) return [];
    const data = toValue(chart);
    if (!data) return [];

    if (data.period === 'WEEKLY') {
      return plot.value.currentDates.map((iso, index) => {
        const date = iso ?? plot.value?.previousDates[index];
        return date ? formatIncomeChartDate(date, appLocale.value) : '';
      });
    }

    return plot.value.categories.map((day) =>
      formatIncomeChartDayInMonth(data.current.from, Number(day), appLocale.value),
    );
  });

  const options = computed<ApexOptions>(() =>
    buildIncomeChartApexOptions({
      categories: categories.value,
      tooltipLabels: tooltipLabels.value,
      seriesNames: INCOME_CHART_LINES.map((line) => t(line.nameKey)),
      seriesColors: INCOME_CHART_LINES.map((line) => line.color),
      rtl: appLocale.value === 'fa',
      locale: appLocale.value === 'fa' ? 'fa-IR' : 'en-US',
      isDark: isDark.value,
    }),
  );

  return { series, options, rangeLabel };
}

function shouldShowMonthDayLabel(day: number): boolean {
  return day === 1 || day % 5 === 0;
}

function useDocumentTheme() {
  const isDark = ref(false);
  let observer: MutationObserver | undefined;

  onMounted(() => {
    const root = document.documentElement;
    isDark.value = root.dataset.theme === 'dark';
    observer = new MutationObserver(() => {
      isDark.value = root.dataset.theme === 'dark';
    });
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  });

  onUnmounted(() => {
    observer?.disconnect();
  });

  return isDark;
}

function buildIncomeChartApexOptions(input: {
  categories: string[];
  tooltipLabels: string[];
  seriesNames: string[];
  seriesColors: string[];
  rtl: boolean;
  locale: string;
  isDark: boolean;
}): ApexOptions {
  const formatAmount = (value: number) =>
    new Intl.NumberFormat(input.locale, { maximumFractionDigits: 0 }).format(value);
  const gridColor = input.isDark ? TABLE_BORDER_DARK : TABLE_BORDER_LIGHT;
  const labelColor = input.isDark ? color.text.dark.soft : color.text.soft;

  return {
    chart: {
      type: 'area',
      fontFamily: 'inherit',
      height: 310,
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
      background: 'transparent',
    },
    colors: input.seriesColors,
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: 'straight',
      width: [2, 2],
    },
    markers: {
      size: 0,
      strokeColors: input.isDark ? color.surface.dark.DEFAULT : color.white,
      strokeWidth: 2,
      hover: { size: 6 },
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'right',
      fontSize: '13px',
      labels: { colors: labelColor },
      markers: { size: 6 },
    },
    grid: {
      borderColor: gridColor,
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      type: 'category',
      categories: input.categories,
      axisBorder: { show: true, color: gridColor, strokeWidth: 1 },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      labels: {
        style: { colors: labelColor, fontSize: '12px' },
        rotate: 0,
        hideOverlappingLabels: false,
      },
    },
    yaxis: {
      opposite: input.rtl,
      labels: {
        show: false,
        // Restore vertical-axis labels:
        // style: { colors: labelColor, fontSize: '12px' },
        // formatter: (value: number) =>
        //   new Intl.NumberFormat(input.locale, {
        //     notation: 'compact',
        //     compactDisplay: 'short',
        //     maximumFractionDigits: 1,
        //   }).format(value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom({ series, dataPointIndex }) {
        const title = input.tooltipLabels[dataPointIndex] ?? '';
        const rows = input.seriesNames
          .map((name, seriesIndex) => {
            const value = Array.isArray(series[seriesIndex])
              ? series[seriesIndex][dataPointIndex]
              : null;
            const formatted = value == null ? '—' : formatAmount(Number(value));
            const swatch = input.seriesColors[seriesIndex] ?? CURRENT_COLOR;
            return `<div class="income-chart-tooltip__row"><span class="income-chart-tooltip__name"><span class="income-chart-tooltip__swatch" style="background:${swatch}"></span>${name}</span><span>${formatted}</span></div>`;
          })
          .join('');

        return `<div class="income-chart-tooltip" dir="${input.rtl ? 'rtl' : 'ltr'}"><div class="income-chart-tooltip__title">${title}</div>${rows}</div>`;
      },
    },
  };
}
