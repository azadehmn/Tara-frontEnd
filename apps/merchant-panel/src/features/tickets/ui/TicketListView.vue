<template>
  <div class="flex flex-col gap-4">
    <p v-if="error" class="text-sm text-red-600">{{ error.message }}</p>
    <TrCard>
      <TrTable
        :columns="columns"
        :items="tickets"
        :loading="pending"
        :title="t('common.empty')"
        vector="NoResult"
        show-card-header-label
        card-header-column="id"
        card-header-addon-column="status"
      >
        <template #item-id="{ item }">
          <span class="inline-flex min-w-0 items-center gap-sm">
            <TrAvatar
              v-if="item.status === TicketStatus.CLOSED"
              shape="square"
              size="sm"
              class-icon="!text-primary"
            >
              <LetterIcon />
            </TrAvatar>
            <TrAvatar v-else shape="square" size="sm">
              <LetterOpenIcon />
            </TrAvatar>
            <span class="min-w-0 truncate">{{ item.id }}</span>
          </span>
        </template>
        <template #item-updatedat>
          --
        </template>
        <template #item-status="{ item }">
          <TrStatus :type="ticketStatusType(item.status)" :text="t(ticketStatusLabelKey(item.status))" />
        </template>
      </TrTable>
      <template #footer>
        <div class="flex items-center gap-3">
          <TrButton
            variant="outlined"
            size="small"
            :text="t('common.prev')"
            :disabled="page <= 1"
            @click="goToPreviousPage"
          />
          <span>{{ page }} / {{ pagination.totalPages }}</span>
          <TrButton
            variant="outlined"
            size="small"
            :text="t('common.next')"
            :disabled="page >= pagination.totalPages"
            @click="goToNextPage"
          />
        </div>
      </template>
    </TrCard>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { TrAvatar, TrButton, TrCard, TrStatus, TrTable, type TrTableColumn } from '@tara/ui';
import LetterIcon from '@tara/ui/icons/LetterIcon.vue';
import LetterOpenIcon from '@tara/ui/icons/LetterOpenIcon.vue';
import { useTicketList } from '../composables/use-ticket-list';
import { ticketStatusLabelKey, ticketStatusType } from '../lib/ticket-status';
import { TicketStatus } from '../model/ticket';

const { t } = useI18n();
const { tickets, pagination, page, pending, error, fetch } = useTicketList();

onMounted(() => {
  void fetch(true);
});

function goToPreviousPage() {
  if (page.value <= 1) return;
  page.value -= 1;
  void fetch();
}

function goToNextPage() {
  if (page.value >= pagination.value.totalPages) return;
  page.value += 1;
  void fetch();
}

const columns = computed<TrTableColumn[]>(() => [
  { name: 'id', label: t('ticket.fields.id'), width: 'minmax(200px, 0.9fr)' },
  { name: 'title', label: t('ticket.fields.title') },
  { name: 'updatedAt', label: t('ticket.fields.updatedAt'), width: 'minmax(150px, 0.7fr)' },
  { name: 'status', label: t('ticket.fields.status'), width: 'minmax(120px, 0.5fr)' },
]);
</script>
