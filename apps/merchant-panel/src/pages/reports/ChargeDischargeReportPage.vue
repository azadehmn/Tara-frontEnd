<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrPageHeading, TrTable, type TrTableColumn } from '@tara/ui';
import { chargeDischargeRows } from '@features/reports';
import { formatAmount } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  { name: 'contractTitle', label: t('reports.chargeDischarge.contractTitle') },
  {
    name: 'aggregatedAmountRial',
    label: t('reports.chargeDischarge.aggregatedAmountRial'),
    width: 'minmax(180px, 1fr)',
  },
  {
    name: 'aggregatedAmount',
    label: t('reports.chargeDischarge.aggregatedAmount'),
    width: 'minmax(180px, 1fr)',
  },
  {
    name: 'type',
    label: t('reports.chargeDischarge.type'),
    width: 'minmax(140px, 0.7fr)',
  },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsChargeDischarge')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="chargeDischargeRows"
        :empty-text="t('common.empty')"
        show-card-header-label
        card-header-column="contractTitle"
      >
        <template #item-aggregatedamountrial="{ item }">
          {{ formatAmount(item.aggregatedAmountRial, locale) }}
        </template>
        <template #item-aggregatedamount="{ item }">
          {{ formatAmount(item.aggregatedAmount, locale) }}
        </template>
        <template #item-type="{ item }">
          {{ t(`reports.chargeDischarge.types.${item.type}`) }}
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
