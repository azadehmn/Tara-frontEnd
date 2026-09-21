<script setup lang="ts">
import { computed } from 'vue';
import {
  TrAction,
  TrCard,
  TrLabel,
  TrPageHeading,
  TrTable,
  type TrActionItem,
  type TrTableColumn,
} from '@tara/ui';
import TrDetailsIcon from '@tara/ui/icons/DetailsIcon.vue';
import { summaryReportRows, type SummaryReportRow } from '@features/reports';
import { formatAmount, formatNumber } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'merchantContractNumber',
    label: t('reports.summary.merchantContractNumber'),
    width: 'minmax(140px, 0.7fr)',
  },
  { name: 'merchantContractTitle', label: t('reports.summary.merchantContractTitle') },
  {
    name: 'purchaseCount',
    label: t('reports.summary.purchaseCount'),
    width: 'minmax(160px, 0.7fr)',
  },
  {
    name: 'purchaseAmountRial',
    label: t('reports.summary.purchaseAmountRial'),
    width: 'minmax(180px, 0.8fr)',
  },
]);

function rowActions(_item: SummaryReportRow): TrActionItem[] {
  return [
    {
      id: 'details',
      label: t('reports.summary.details'),
      icon: TrDetailsIcon,
      command: () => undefined,
    },
  ];
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsSummary')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="summaryReportRows"
        :title="t('common.empty')"
        vector="EmptyPaper"
        show-card-header-label
        card-header-column="merchantContractNumber"
      >
        <template #item-purchasecount="{ item }">
          {{ formatNumber(item.purchaseCount, locale) }}
        </template>
        <template #column-purchaseamountrial="{ column }">
          <span class="inline-flex items-center">
            {{ column.label }}
            <TrLabel :text="t('common.currency.rial')" type="neutral" class="mx-xs" />
          </span>
        </template>
        <template #item-purchaseamountrial="{ item }">
          {{ formatAmount(item.purchaseAmountRial, locale) }}
        </template>
        <template #action="{ item }">
          <TrAction :aria-label="t('common.actions')" :items="rowActions(item)" />
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
