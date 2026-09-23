<script setup lang="ts">
import { computed } from 'vue';
import { formatAmount, formatNumber } from '@shared/utils/format';
import type { MerchantSummary } from '../model/summary';
import SummaryCard from './SummaryCard.vue';

const props = defineProps<{ summary: MerchantSummary }>();

const { t, locale } = useI18n();

const rows = computed(() => [
  // {
  //   label: t('summary.balance.totalTransactions'),
  //   value: formatNumber(props.summary.totalTransactions, locale.value),
  // },
  {
    label: t('summary.balance.returned'),
    value: formatNumber(props.summary.returnedTransactions, locale.value),
  },
  {
    label: t('summary.sales.daily'),
    value: formatAmount(props.summary.dailySales, locale.value),
    currency: true,
  },
]);
</script>

<template>
  <SummaryCard
    :title="t('summary.balance.title')"
    :hero-label="t('summary.balance.withdrawable')"
    :hero-value="formatAmount(summary.withdrawableBalance, locale)"
    :rows="rows"
  />
</template>
