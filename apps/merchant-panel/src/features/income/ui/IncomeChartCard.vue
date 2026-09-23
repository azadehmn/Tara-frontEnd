<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import {
  TrCard,
  TrSegmentedControl,
  type TrSegmentedControlOption,
  type TrSegmentedControlValue,
} from '@tara/ui';
import { useApexChartResize } from '../composables/use-apex-chart-resize';
import { useIncomeChart } from '../composables/use-income-chart';
import { useIncomeChartSeries } from '../composables/use-income-chart-series';
import { IncomeChartPeriod } from '../model/income-chart';

const emit = defineEmits<{
  'update:period': [period: IncomeChartPeriod];
}>();

const { t } = useI18n();
const { period, chart, pending, error, fetch, setPeriod } = useIncomeChart();
const { series, options, rangeLabel } = useIncomeChartSeries(chart);
const plotEl = ref<HTMLElement | null>(null);
const { fit: fitPlot } = useApexChartResize(plotEl);

watch(period, (value) => emit('update:period', value), { immediate: true });

const periodOptions = computed<TrSegmentedControlOption[]>(() => [
  { value: IncomeChartPeriod.Monthly, label: t('income.chart.monthly') },
  { value: IncomeChartPeriod.Weekly, label: t('income.chart.weekly') },
]);

function updatePeriod(value: TrSegmentedControlValue): void {
  if (value !== IncomeChartPeriod.Monthly && value !== IncomeChartPeriod.Weekly) return;
  void setPeriod(value);
}

onMounted(fetch);
</script>

<template>
  <div data-tour="income">
    <TrCard>
    <template #header>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-heading-md">{{ t('income.chart.title') }}</h2>
          <p v-if="rangeLabel" class="mt-1 text-sm text-text-soft">{{ rangeLabel }}</p>
        </div>
        <div data-tour="income-period">
          <TrSegmentedControl
            :model-value="period"
            :options="periodOptions"
            :label="t('income.chart.period')"
            :disabled="pending"
            @update:model-value="updatePeriod"
          />
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
  </div>
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
