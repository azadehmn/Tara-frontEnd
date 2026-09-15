<script setup lang="ts">
import { computed } from 'vue';
import { formatAmount } from '@shared/utils/format';
import type { MerchantSummary } from '../model/summary';
import SummaryCard from './SummaryCard.vue';

const props = defineProps<{ summary: MerchantSummary }>();

const { t, locale } = useI18n();

const rows = computed(() => [
  {
    label: t('summary.sales.week'),
    value: formatAmount(props.summary.previousWeekSales, locale.value),
  },
  {
    label: t('summary.sales.month'),
    value: formatAmount(props.summary.previousMonthSales, locale.value),
  },
  {
    label: t('summary.sales.year'),
    value: formatAmount(props.summary.previousYearSales, locale.value),
  },
]);
</script>

<template>
  <SummaryCard
    :title="t('summary.sales.title')"
    :hero-label="t('summary.sales.daily')"
    :hero-value="formatAmount(summary.dailySales, locale)"
    :rows="rows"
  />
</template>
