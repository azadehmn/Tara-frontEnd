<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrLabel, type TrLabelType } from '@tara/ui';
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

function toLabelType(tone: PerformanceTone): TrLabelType {
  if (tone === 'success') return 'positive';
  if (tone === 'danger') return 'negative';
  return 'neutral';
}
</script>

<template>
  <TrCard>
    <template #header>
      <h2 class="text-heading-sm">{{ t('summary.performance.title') }}</h2>
    </template>

    <ul>
      <li
        v-for="metric in metrics"
        :key="metric.key"
        class="flex items-center justify-between gap-md border-b border-border-divider py-md first:pt-0 last:border-b-0 last:pb-0 dark:border-gray-800"
      >
        <div class="min-w-0">
          <p class="text-body-sm text-text-soft">{{ metric.label }}</p>
          <div class="mt-2xs flex items-center gap-xs">
            <strong class="text-heading-md">{{ metric.value }}</strong>
            <span v-if="metric.unit" class="text-body-sm text-text-soft">{{ metric.unit }}</span>
          </div>
          <div class="mt-xs flex flex-wrap items-center gap-xs">
            <TrLabel :text="metric.trendLabel" :type="toLabelType(metric.tone)" />
            <span class="text-caption-regular text-text-soft">
              {{ t('summary.performance.comparedToPreviousWeek') }}
            </span>
          </div>
        </div>

        <MiniSparkline :values="metric.points" :tone="metric.tone" />
      </li>
    </ul>
  </TrCard>
</template>
