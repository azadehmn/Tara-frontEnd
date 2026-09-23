<script setup lang="ts">
import { TrCard } from '@tara/ui';
import type { MerchantSummary } from '../model/summary';
import BalanceCard from './BalanceCard.vue';

defineProps<{
  summary: MerchantSummary | null;
  pending: boolean;
  errorMessage: string | null;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex h-full w-full flex-col gap-lg">
    <TrCard v-if="pending && !summary" class="h-full">
      <p class="text-sm opacity-70">{{ t('summary.loading') }}</p>
    </TrCard>
    <TrCard v-else-if="errorMessage" class="h-full">
      <p class="text-sm">{{ errorMessage }}</p>
    </TrCard>
    <BalanceCard v-else-if="summary" class="h-full" :summary="summary" />
  </div>
</template>
