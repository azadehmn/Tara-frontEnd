<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { TrButton, TrCard } from '@tara/ui';
import { formatAmount, formatNumber } from '@shared/utils/format';
import { useApexChartResize } from '../composables/use-apex-chart-resize';
import { useIncomeChart } from '../composables/use-income-chart';
import { useIncomeChartSeries } from '../composables/use-income-chart-series';
import { IncomeChartPeriod } from '../model/income-chart';

interface SummaryMetrics {
  todaySuccessfulTransactionsAmount: number;
  todaySuccessfulTransactionsCount: number;
  currentMonthSuccessfulTransactionsAmount: number;
  currentMonthSuccessfulTransactionsCount: number;
}

const props = defineProps<{ summary?: SummaryMetrics | null }>();

const { t, locale } = useI18n();
const { period, chart, pending, error, fetch, setPeriod } = useIncomeChart();
const { series, options, rangeLabel } = useIncomeChartSeries(chart);
const plotEl = ref<HTMLElement | null>(null);
const { fit: fitPlot } = useApexChartResize(plotEl);

const successfulTransactions = computed(() => {
  if (!props.summary) return [];

  const monthly = period.value === IncomeChartPeriod.Monthly;

  const amount = monthly
    ? props.summary.currentMonthSuccessfulTransactionsAmount
    : props.summary.todaySuccessfulTransactionsAmount;
  const count = monthly
    ? props.summary.currentMonthSuccessfulTransactionsCount
    : props.summary.todaySuccessfulTransactionsCount;
  const labelGroup = monthly ? 'successfulCurrentMonth' : 'successfulToday';

  return [
    {
      label: t(`summary.${labelGroup}.amount`),
      value: formatAmount(amount, locale.value),
    },
    {
      label: t(`summary.${labelGroup}.count`),
      value: formatNumber(count, locale.value),
    },
  ];
});

onMounted(fetch);
</script>

<template>
  <TrCard>
    <template #header>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-heading-md">{{ t('income.chart.title') }}</h2>
          <p v-if="rangeLabel" class="mt-1 text-sm text-text-soft">{{ rangeLabel }}</p>
        </div>
        <div class="flex gap-1" role="group" :aria-label="t('income.chart.period')">
          <TrButton
            size="small"
            variant="outlined"
            :text="t('income.chart.monthly')"
            :selected="period === IncomeChartPeriod.Monthly"
            :disabled="pending"
            @click="setPeriod(IncomeChartPeriod.Monthly)"
          />
          <TrButton
            size="small"
            variant="outlined"
            :text="t('income.chart.weekly')"
            :selected="period === IncomeChartPeriod.Weekly"
            :disabled="pending"
            @click="setPeriod(IncomeChartPeriod.Weekly)"
          />
        </div>
      </div>

      <div
        v-if="successfulTransactions.length"
        class="mt-[24px] flex flex-wrap rounded-sm border border-border-divider dark:border-gray-800"
      >
        <div class="flex w-full flex-col items-center justify-center gap-xs p-md md:w-1/2">
          <span class="text-body-400-b3 text-text-soft">
            {{ successfulTransactions[0]?.label }}
          </span>
          <span class="text-display-700-d3">{{ successfulTransactions[0]?.value }}</span>
        </div>
        <div
          class="flex w-full flex-col items-center justify-center gap-xs border-0 border-t border-border-divider p-md dark:border-gray-800 md:w-1/2 md:border-r md:border-t-0"
        >
          <span class="text-body-400-b3 text-text-soft">
            {{ successfulTransactions[1]?.label }}
          </span>
          <span class="text-display-700-d3">{{ successfulTransactions[1]?.value }}</span>
        </div>
      </div>
    </template>

    <p v-if="pending && !chart" class="text-sm opacity-70">{{ t('income.chart.loading') }}</p>
    <p v-else-if="error" class="text-sm">{{ error.message }}</p>
    <div v-else-if="chart" ref="plotEl" class="income-chart-plot">
      <VueApexCharts
        type="area"
        height="310"
        :options="options"
        :series="series"
        @mounted="fitPlot"
        @updated="fitPlot"
      />
    </div>
  </TrCard>
</template>

<style>
.income-chart-plot {
  overflow: hidden;
}

.apexcharts-tooltip {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

.apexcharts-legend-series {
  display: inline-flex !important;
  flex-direction: row-reverse;
  align-items: center;
  gap: 5px;
}

.apexcharts-legend-marker {
  margin: 0 !important;
}

.apexcharts-legend-text {
  margin: 0 !important;
}

.income-chart-tooltip {
  min-width: 10rem;
  padding: 8px 10px;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  background: #fff;
  color: #2e2e38;
  box-shadow: 0 8px 24px rgb(16 24 40 / 12%);
  direction: rtl;
  text-align: right;
}

.income-chart-tooltip__title {
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
}

.income-chart-tooltip__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.income-chart-tooltip__name {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.income-chart-tooltip__swatch {
  display: inline-block;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 999px;
}

html[data-theme='dark'] .income-chart-tooltip {
  border-color: #1d2939;
  background: #1e2634;
  color: #fff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 35%);
}
</style>
