<script setup lang="ts">
import { TrButton, TrPageHeading } from '@tara/ui';

const { t } = useI18n();
</script>

<template>
  <TrPageHeading :title="t('ticket.title')" :description="t('ticket.description')">
    <template #action>
      <TrButton :text="t('ticket.create')" />
    </template>
  </TrPageHeading>
</template>
