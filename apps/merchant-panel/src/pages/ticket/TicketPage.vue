<script setup lang="ts">
import { TicketListView } from '@features/tickets';
import { TrButton, TrPageHeading } from '@tara/ui';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('ticket.title')" :description="t('ticket.description')">
      <template #action>
        <TrButton :text="t('ticket.create')" />
      </template>
    </TrPageHeading>
    <TicketListView />
  </div>
</template>
