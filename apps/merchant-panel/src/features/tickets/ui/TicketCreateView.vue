<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { TrButton, TrCard, TrPageHeading, TrTextField } from '@tara/ui';

const { t } = useI18n();
const router = useRouter();

const title = ref('');
const message = ref('');

function submit() {
  if (!title.value.trim() || !message.value.trim()) return;
  router.push({ name: 'ticket' });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('ticket.addTitle')" :description="t('ticket.addDescription')" has-back />

    <TrCard padding="lg">
      <form class="flex flex-col gap-4" @submit.prevent="submit">
        <TrTextField v-model="title" name="ticket-title" :label-text="t('ticket.fields.title')" />
        <TrTextField
          v-model="message"
          name="ticket-message"
          :label-text="t('ticket.fields.message')"
        />
        <div class="flex justify-end">
          <TrButton
            html-type="submit"
            :text="t('ticket.submit')"
            :disabled="!title.trim() || !message.trim()"
          />
        </div>
      </form>
    </TrCard>
  </div>
</template>
