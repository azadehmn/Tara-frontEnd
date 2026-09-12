<script setup lang="ts">
import ContractListView from '@features/contracts/ui/ContractListView.vue';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-heading-lg">{{ t('layout.nav.contractsAcquiring') }}</h1>
    <ContractListView scope="acceptor" detail-route="contracts-acquiring-detail" />
  </div>
</template>
