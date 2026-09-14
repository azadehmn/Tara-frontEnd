<script setup lang="ts">
import ContractListView from '@features/contracts/ui/ContractListView.vue';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-heading-lg">{{ t('layout.nav.contractsOrganization') }}</h1>
    <ContractListView scope="organization" detail-route="contracts-organization-detail" />
  </div>
</template>
