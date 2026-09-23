<script setup lang="ts">
import { computed } from 'vue';
import { TrLabel } from '@tara/ui';
import { formatAmount, formatNumber } from '@shared/utils/format';
import { IncomeChartPeriod } from '../model/income-chart';

const props = defineProps<{
  summary?: {
    currentWeekSuccessfulTransactionsAmount: number;
    currentWeekSuccessfulTransactionsCount: number;
    currentMonthSuccessfulTransactionsAmount: number;
    currentMonthSuccessfulTransactionsCount: number;
  } | null;
  period: IncomeChartPeriod;
}>();

const { t, locale } = useI18n();

const items = computed(() => {
  if (!props.summary) return [];

  const monthly = props.period === IncomeChartPeriod.Monthly;
  const amount = monthly
    ? props.summary.currentMonthSuccessfulTransactionsAmount
    : props.summary.currentWeekSuccessfulTransactionsAmount;
  const count = monthly
    ? props.summary.currentMonthSuccessfulTransactionsCount
    : props.summary.currentWeekSuccessfulTransactionsCount;
  const labelGroup = monthly ? 'successfulCurrentMonth' : 'successfulCurrentWeek';

  return [
    {
      label: t(`summary.${labelGroup}.amount`),
      value: formatAmount(amount, locale.value),
      currency: true,
    },
    {
      label: t(`summary.${labelGroup}.count`),
      value: formatNumber(count, locale.value),
      currency: false,
    },
  ];
});
</script>

<template>
  <div
    v-if="items.length"
    class="flex flex-wrap rounded-sm border border-border-divider dark:border-gray-800"
  >
    <div class="flex w-full flex-col items-center justify-center gap-xs p-md md:w-1/2">
      <span class="text-body-sm text-text-soft">{{ items[0]?.label }}</span>
      <div class="flex items-center gap-xs">
        <span class="text-display-700-d3">{{ items[0]?.value }}</span>
        <TrLabel v-if="items[0]?.currency" :text="t('common.currency.rial')" type="neutral" />
      </div>
    </div>
    <div
      class="flex w-full flex-col items-center justify-center gap-xs border-0 border-t border-border-divider p-md dark:border-gray-800 md:w-1/2 md:border-r md:border-t-0"
    >
      <span class="text-body-sm text-text-soft">{{ items[1]?.label }}</span>
      <span class="text-display-700-d3">{{ items[1]?.value }}</span>
    </div>
  </div>
</template>
