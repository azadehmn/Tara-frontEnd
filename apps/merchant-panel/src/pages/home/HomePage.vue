<script setup lang="ts">
import { onMounted } from 'vue';
import { IncomeChartCard } from '@features/income';
import { PerformanceCard, SummaryCards, useSummary } from '@features/summary';
import { RecentTransactionsCard } from '@features/transactions';
import { TrPageHeading } from '@tara/ui';

const { t } = useI18n();
const { summary, pending, error, fetch } = useSummary();

onMounted(fetch);
</script>

<template>
  <div>
    <TrPageHeading :title="t('layout.nav.dashboard')"/>
    <PerformanceCard v-if="summary" class="mt-lg" :summary="summary" />
    <div class="mt-lg grid grid-cols-12 items-stretch gap-md">
      <IncomeChartCard
        class="col-span-full min-[992px]:col-span-7 xl:col-span-8"
        :summary="summary"
      />
      <div class="col-span-full flex min-[992px]:col-span-5 xl:col-span-4">
        <SummaryCards
          :summary="summary"
          :pending="pending"
          :error-message="error?.message ?? null"
        />
      </div>
    </div>
    <RecentTransactionsCard class="mt-lg" />
  </div>
</template>
