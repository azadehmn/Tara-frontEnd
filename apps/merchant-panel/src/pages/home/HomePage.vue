<script setup lang="ts">
import { onMounted } from 'vue';
import { IncomeChartCard } from '@features/income';
import { SummaryCards, useSummary } from '@features/summary';
import { TrPageHeading } from '@tara/ui';

const { t } = useI18n();
const { summary, pending, error, fetch } = useSummary();

onMounted(fetch);
</script>

<template>
  <div>
    <TrPageHeading :title="t('layout.nav.dashboard')" has-back />    
    <div class="mt-lg grid grid-cols-1 gap-lg min-[992px]:grid-cols-12">
      <IncomeChartCard
        class="min-[992px]:col-span-7 xl:col-span-8"
        :summary="summary"
      />
      <SummaryCards
        class="min-[992px]:col-span-5 xl:col-span-4"
        :summary="summary"
        :pending="pending"
        :error-message="error?.message ?? null"
      />
    </div>
  </div>
</template>
