<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrLabel, TrPageHeading, TrTable, type TrTableColumn, type TrTableRow } from '@tara/ui';
import { formatAmount } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'trackingCode',
    label: t('transactions.trackingCode'),
    width: 'minmax(140px, 0.7fr)',
  },
  {
    name: 'amountRial',
    label: t('transactions.amountRial'),
    width: 'minmax(140px, 0.7fr)',
  },
  { name: 'dateTime', label: t('transactions.dateTime') },
]);

const items: TrTableRow[] = [];
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.transactions')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="items"
        :title="t('common.empty')"
        vector="Transactions"
        show-card-header-label
        card-header-column="trackingCode"
      >
        <template #column-amountrial="{ column }">
          <span class="inline-flex items-center">
            {{ column.label }}
            <TrLabel :text="t('common.currency.rial')" type="neutral" class="mx-xs" />
          </span>
        </template>
        <template #item-amountrial="{ item }">
          {{ formatAmount(item.amountRial, locale) }}
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
