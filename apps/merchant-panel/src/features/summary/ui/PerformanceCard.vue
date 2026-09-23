<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrLabel } from '@tara/ui';
import { formatAmount, formatNumber, formatPercent } from '@shared/utils/format';
import {
  calculateTrend,
  type TrendDirection,
  type TrendResult,
} from '../lib/calculate-trend';
import type { MerchantSummary } from '../model/summary';
import MiniSparkline from './MiniSparkline.vue';

type PerformanceTone = 'success' | 'danger' | 'neutral';
/*--------------------------------------------------------------------------------
    UI-ready model for displaying each performance metric.
    for example salesAmount api convert to 
    {
      key: 'sales',
      label: 'فروش',
      value: '۱۸۵٬۰۰۰٬۰۰۰',
      unit: 'ریال',
      trend: {...},
      tone: 'success',
      trendLabel: '+12.8٪',
      points: [...]
    }
 -------------------------------------------------------------------------------- */


type PerformanceMetric = {
  key: string;
  label: string;
  value: string;
  unit?: string;
  trend: TrendResult;
  tone: PerformanceTone;
  trendLabel: string;
  points: number[];
};

const props = defineProps<{ summary: MerchantSummary }>();

const { t, locale } = useI18n();

const metrics = computed<PerformanceMetric[]>(() => {
  const { current, previous } = props.summary.weeklyPerformance;

  return [
    createMetric({
      key: 'sales',
      label: t('summary.performance.sales'),
      value: formatAmount(current.salesAmount, locale.value),
      unit: t('common.currency.rial'),
      current: current.salesAmount,
      previous: previous.salesAmount,
      points: current.items.map((item) => item.salesAmount),
    }),
    createMetric({
      key: 'successfulTransactions',
      label: t('summary.performance.successfulTransactions'),
      value: formatNumber(current.successfulTransactionsCount, locale.value),
      current: current.successfulTransactionsCount,
      previous: previous.successfulTransactionsCount,
      points: current.items.map((item) => item.successfulTransactionsCount),
    }),
    createMetric({
      key: 'returnRate',
      label: t('summary.performance.returnRate'),
      value: formatPercent(current.returnRate, locale.value),
      current: current.returnRate,
      previous: previous.returnRate,
      points: current.items.map((item) => item.returnRate),
    }),
  ];
});

function createMetric(input: {
  key: string;
  label: string;
  value: string;
  unit?: string;
  current: number;
  previous: number;
  points: number[];
  higherIsBetter?: boolean;
}): PerformanceMetric {
  const trend = calculateTrend(input.current, input.previous);

  return {
    key: input.key,
    label: input.label,
    value: input.value,
    unit: input.unit,
    trend,
    tone: resolveTone(trend.direction, input.higherIsBetter ?? true),
    trendLabel: formatTrend(trend),
    points: input.points,
  };
}

function formatTrend(trend: TrendResult): string {
  if (trend.kind === 'new') return t('summary.performance.new');

  const value = formatPercent(trend.percentage, locale.value);
  return trend.percentage > 0 ? `+${value}` : value;
}

function resolveTone(
  direction: TrendDirection,
  higherIsBetter: boolean,
): PerformanceTone {
  if (direction === 'neutral') return 'neutral';

  const improved =
    direction === (higherIsBetter ? 'increase' : 'decrease');
  return improved ? 'success' : 'danger';
}

function toneClass(tone: PerformanceTone): string {
  if (tone === 'success') return 'text-text-success dark:text-text-dark-success';
  if (tone === 'danger') return 'text-text-danger dark:text-text-dark-danger';
  return 'text-text-soft dark:text-text-dark-soft';
}
</script>

<template>
  <div class="grid grid-cols-1 gap-lg min-[992px]:grid-cols-3" data-tour="summary">
    <TrCard v-for="metric in metrics" :key="metric.key" padding="lg">
      <p class="whitespace-nowrap text-body-md text-text-soft dark:text-text-dark-soft">{{ metric.label }}</p>
      <div class="mt-md flex items-center justify-between gap-md">
        <div class="min-w-0">
          <div class="flex items-center gap-xs">
            <strong class="text-display-sm min-[992px]:text-heading-lg min-[1536px]:text-display-sm">{{ metric.value }}</strong>
            <TrLabel v-if="metric.unit" :text="metric.unit" type="neutral" />
          </div>
          <p class="mt-xs flex flex-wrap items-center gap-xs text-body-sm">
            <span :class="toneClass(metric.tone)">{{ metric.trendLabel }}</span>
            <span class="text-text-soft">{{ t('summary.performance.comparedToPreviousWeek') }}</span>
          </p>
        </div>
        <MiniSparkline class="shrink-0" :values="metric.points" :tone="metric.tone" />
      </div>
    </TrCard>
  </div>
</template>
