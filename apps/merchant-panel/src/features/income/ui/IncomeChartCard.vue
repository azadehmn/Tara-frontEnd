<script setup lang="ts">
import { onMounted } from 'vue';
import { TrButton, TrCard } from '@tara/ui';
import { useIncomeChart } from '../composables/use-income-chart';
import { IncomeChartPeriod } from '../model/income-chart';

const { t } = useI18n();
const { period, chart, pending, error, fetch, setPeriod } = useIncomeChart();

onMounted(fetch);
</script>

<template>
  <TrCard>
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-heading-md">{{ t('income.chart.title') }}</h2>
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
    </template>

    <p v-if="pending" class="text-sm opacity-70">{{ t('income.chart.loading') }}</p>
    <p v-else-if="error" class="text-sm">{{ error.message }}</p>
    <div v-else-if="chart" class="income-chart-card__plot" aria-hidden="true" />
  </TrCard>
</template>
