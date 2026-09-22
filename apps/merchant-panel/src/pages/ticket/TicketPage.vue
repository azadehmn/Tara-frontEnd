<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TicketListView } from '@features/tickets';
import { TrButton, TrPageHeading } from '@tara/ui';

const { t } = useI18n();
const router = useRouter();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('ticket.title')" :description="t('ticket.description')">
      <template #action>
        <TrButton :text="t('ticket.create')" @click="router.push({ name: 'ticket-faq' })" />
      </template>
    </TrPageHeading>
    <TicketListView />
  </div>
</template>
