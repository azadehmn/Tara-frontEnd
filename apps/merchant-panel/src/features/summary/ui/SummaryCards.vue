<script setup lang="ts">
import { TrCard } from '@tara/ui';
import type { MerchantSummary } from '../model/summary';
import BalanceCard from './BalanceCard.vue';
import SalesCard from './SalesCard.vue';

defineProps<{
  summary: MerchantSummary | null;
  pending: boolean;
  errorMessage: string | null;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-lg">
    <TrCard v-if="pending && !summary">
      <p class="text-sm opacity-70">{{ t('summary.loading') }}</p>
    </TrCard>
    <TrCard v-else-if="errorMessage">
      <p class="text-sm">{{ errorMessage }}</p>
    </TrCard>
    <template v-else-if="summary">
      <SalesCard :summary="summary" />
      <BalanceCard :summary="summary" />
    </template>
  </div>
</template>
