<script setup lang="ts">
import { computed } from 'vue';
import { TrCard, TrPageHeading, TrTable, type TrTableColumn } from '@tara/ui';
import { accountBalanceRows } from '@features/reports';
import { formatAmount } from '@shared/utils/format';

const { t, locale } = useI18n();

const columns = computed<TrTableColumn[]>(() => [
  { name: 'mobile', label: t('reports.accountBalance.mobile'), width: 'minmax(140px, 0.7fr)' },
  {
    name: 'nationalCode',
    label: t('reports.accountBalance.nationalCode'),
    width: 'minmax(140px, 0.7fr)',
  },
  { name: 'balanceRial', label: t('reports.accountBalance.balanceRial') },
]);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('layout.nav.reportsAccountBalance')" />
    <TrCard>
      <TrTable
        :columns="columns"
        :items="accountBalanceRows"
        :empty-text="t('common.empty')"
        show-card-header-label
        card-header-column="mobile"
      >
        <template #item-balancerial="{ item }">
          {{ formatAmount(item.balanceRial, locale) }}
        </template>
      </TrTable>
    </TrCard>
  </div>
</template>
