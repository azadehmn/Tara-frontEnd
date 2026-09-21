<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrPageHeading, TrTable, type TrTableColumn } from '@tara/ui';
import { purchaseDetailRows } from '@features/reports';
import { formatAmount } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'trackingCode',
    label: t('reports.purchaseDetail.trackingCode'),
    width: 'minmax(120px, 0.7fr)',
  },
  {
    name: 'referenceNumber',
    label: t('reports.purchaseDetail.referenceNumber'),
    width: 'minmax(120px, 0.6fr)',
  },
  {
    name: 'amountRial',
    label: t('reports.purchaseDetail.amountRial'),
    width: 'minmax(120px, 0.6fr)',
  },
  {
    name: 'dateTime',
    label: t('reports.purchaseDetail.dateTime'),
    width: 'minmax(140px, 0.7fr)',
  },
  {
    name: 'acceptorType',
    label: t('reports.purchaseDetail.acceptorType'),
    width: 'minmax(120px, 0.5fr)',
  },
  {
    name: 'branchCode',
    label: t('reports.purchaseDetail.branchCode'),
    width: 'minmax(100px, 0.4fr)',
  },
  { name: 'acceptorTitle', label: t('reports.purchaseDetail.acceptorTitle') },
  {
    name: 'gateway',
    label: t('reports.purchaseDetail.gateway'),
    width: 'minmax(120px, 0.5fr)',
  },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsPurchaseDetail')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="purchaseDetailRows"
        :empty-text="t('common.empty')"
        show-card-header-label
        card-header-column="trackingCode"
      >
        <template #item-amountrial="{ item }">
          {{ formatAmount(item.amountRial, locale) }}
        </template>
        <template #item-acceptortype="{ item }">
          {{ t(`reports.purchaseDetail.acceptorTypes.${item.acceptorType}`) }}
        </template>
        <template #item-gateway="{ item }">
          {{ t(`reports.purchaseDetail.gateways.${item.gateway}`) }}
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
