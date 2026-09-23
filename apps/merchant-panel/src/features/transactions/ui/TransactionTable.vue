<script setup lang="ts">
import { computed } from 'vue';
import { TrLabel, TrTable, type TrTableColumn, type TrTableRow } from '@tara/ui';
import { formatAmount } from '@shared/utils/format';

withDefaults(
  defineProps<{
    items?: TrTableRow[];
  }>(),
  {
    items: () => [],
  },
);

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'acceptorType',
    label: t('transactions.acceptorType'),
    width: 'minmax(120px, 0.8fr)',
  },
  {
    name: 'acceptorTitle',
    label: t('transactions.acceptorTitle'),
    width: 'minmax(140px, 1fr)',
  },
  {
    name: 'lastStatus',
    label: t('transactions.lastStatus'),
    width: 'minmax(120px, 0.8fr)',
  },
  {
    name: 'totalAmount',
    label: t('transactions.totalAmount'),
    width: 'minmax(150px, 0.9fr)',
  },
  {
    name: 'dateTime',
    label: t('transactions.dateTime'),
    width: 'minmax(140px, 0.9fr)',
  },
]);
</script>

<template>
  <TrTable
    :columns="columns"
    :items="items"
    :title="t('common.empty')"
    vector="Transactions"
    show-card-header-label
    card-header-column="acceptorTitle"
  >
    <template #column-totalamount="{ column }">
      <span class="inline-flex items-center">
        {{ column.label }}
        <TrLabel :text="t('common.currency.rial')" type="neutral" class="mx-xs" />
      </span>
    </template>
    <template #item-totalamount="{ item }">
      {{ formatAmount(item.totalAmount, locale) }}
    </template>
  </TrTable>
</template>
