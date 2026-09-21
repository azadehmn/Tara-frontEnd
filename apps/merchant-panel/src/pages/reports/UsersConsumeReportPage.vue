<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrLabel, TrPageHeading, TrTable, type TrTableColumn } from '@tara/ui';
import { usersConsumeRows } from '@features/reports';
import { formatAmount, formatNumber } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'contractNumber',
    label: t('reports.usersConsume.contractNumber'),
    width: 'minmax(120px, 0.6fr)',
  },
  { name: 'contractTitle', label: t('reports.usersConsume.contractTitle') },
  { name: 'companyName', label: t('reports.usersConsume.companyName') },
  {
    name: 'contractType',
    label: t('reports.usersConsume.contractType'),
    width: 'minmax(120px, 0.6fr)',
  },
  {
    name: 'purchaseCount',
    label: t('reports.usersConsume.purchaseCount'),
    width: 'minmax(120px, 0.5fr)',
  },
  {
    name: 'consumeAmountRial',
    label: t('reports.usersConsume.consumeAmountRial'),
    width: 'minmax(160px, 0.8fr)',
  },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsUsersConsume')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="usersConsumeRows"
        :title="t('common.empty')"
        vector="EmptyPaper"
        show-card-header-label
        card-header-column="contractNumber"
      >
        <template #item-contracttype="{ item }">
          {{ t(`contracts.types.${item.contractType}`) }}
        </template>
        <template #item-purchasecount="{ item }">
          {{ formatNumber(item.purchaseCount, locale) }}
        </template>
        <template #column-consumeamountrial="{ column }">
          <span class="inline-flex items-center">
            {{ column.label }}
            <TrLabel :text="t('common.currency.rial')" type="neutral" class="mx-xs" />
          </span>
        </template>
        <template #item-consumeamountrial="{ item }">
          {{ formatAmount(item.consumeAmountRial, locale) }}
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
