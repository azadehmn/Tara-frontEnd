<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrPageHeading, TrStatus, TrTable, type TrStatusType, type TrTableColumn } from '@tara/ui';
import { returnsReportRows, type ReturnStatus } from '@features/reports';
import { formatAmount } from '@shared/utils/format';

const { t, locale } = useI18n();

const statusType: Record<ReturnStatus, TrStatusType> = {
  pending: 'warning',
  done: 'positive',
  rejected: 'negative',
};

const columns = computed<TrTableColumn[]>(() => [
  {
    name: 'userMobile',
    label: t('reports.returns.userMobile'),
    width: 'minmax(130px, 0.6fr)',
  },
  {
    name: 'purchaseDate',
    label: t('reports.returns.purchaseDate'),
    width: 'minmax(110px, 0.5fr)',
  },
  { name: 'storeTitle', label: t('reports.returns.storeTitle') },
  {
    name: 'returnDate',
    label: t('reports.returns.returnDate'),
    width: 'minmax(110px, 0.5fr)',
  },
  {
    name: 'returnAmountRial',
    label: t('reports.returns.returnAmount'),
    width: 'minmax(120px, 0.6fr)',
  },
  {
    name: 'purchaseAmountRial',
    label: t('reports.returns.purchaseAmountRial'),
    width: 'minmax(140px, 0.6fr)',
  },
  {
    name: 'status',
    label: t('reports.returns.status'),
    width: 'minmax(110px, 0.5fr)',
  },
  {
    name: 'referenceNumber',
    label: t('reports.returns.referenceNumber'),
    width: 'minmax(120px, 0.5fr)',
  },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsReturns')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="returnsReportRows"
        :empty-text="t('common.empty')"
        show-card-header-label
        card-header-column="userMobile"
        card-header-addon-column="status"
      >
        <template #item-returnamountrial="{ item }">
          {{ formatAmount(item.returnAmountRial, locale) }}
        </template>
        <template #item-purchaseamountrial="{ item }">
          {{ formatAmount(item.purchaseAmountRial, locale) }}
        </template>
        <template #item-status="{ item }">
          <TrStatus
            :type="statusType[item.status]"
            :text="t(`reports.returns.statuses.${item.status}`)"
          />
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
