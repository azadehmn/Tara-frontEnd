<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TrButton, TrCard, TrPageHeading, TrTextarea, TrTextField } from '@tara/ui';
import ticketAddImage from '@assets/images/ticket-add.png';

const { t } = useI18n();
const router = useRouter();

const title = ref('');
const message = ref('');

const canSubmit = computed(() => Boolean(title.value.trim() && message.value.trim()));

function submit() {
  if (!canSubmit.value) return;
  router.push({ name: 'ticket' });
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('ticket.addTitle')" has-back />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <TrCard padding="lg" class="lg:col-span-2">
        <form class="flex min-w-0 flex-col gap-4" @submit.prevent="submit">
          <p class="m-0 text-body-md text-text-soft dark:text-text-dark-soft">
            {{ t('ticket.addIntro') }}
          </p>
          <TrTextField
            v-model="title"
            name="ticket-title"
            :placeholder="t('ticket.fields.title')"
            :label-text="t('ticket.fields.title')"
          />
          <TrTextarea
            v-model="message"
            name="ticket-message"
            :placeholder="t('ticket.fields.message')"
            :rows="8"
          />
          <div class="mt-auto flex justify-end">
            <TrButton html-type="submit" :text="t('ticket.submit')" :disabled="!canSubmit" />
          </div>
        </form>
      </TrCard>

      <aside class="flex flex-col items-center gap-4 lg:col-span-1">
        <img
          :src="ticketAddImage"
          alt=""
          class="h-auto w-full max-w-[280px] object-contain"
        />
        <ul
          class="m-0 flex list-disc flex-col gap-sm ps-md text-body-sm text-text-soft dark:text-text-dark-soft"
        >
          <li>{{ t('ticket.sla.reviewedBy') }}</li>
          <li>{{ t('ticket.sla.longerCases') }}</li>
          <li>{{ t('ticket.sla.withinHours') }}</li>
        </ul>
      </aside>
    </div>
  </div>
</template>
