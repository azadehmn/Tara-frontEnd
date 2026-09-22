<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { TrAccordion, TrCard, TrIcon, TrNavLink, TrPageHeading } from '@tara/ui';
import InfoFillIcon from '@tara/ui/icons/InfoFillIcon.vue';
import { faqItems, faqItemAnswerKey, faqItemQuestionKey, type FaqSection } from '../config/faq-items';

const { t } = useI18n();
const section = ref<FaqSection>('videos');

const visibleItems = computed(() => faqItems.filter((item) => item.section === section.value));

const sectionTitleKey = computed(() => {
  if (section.value === 'videos') return 'faq.nav.videos';
  if (section.value === 'support') return 'faq.nav.support';
  return 'faq.nav.questions';
});

function sectionCount(key: FaqSection) {
  return faqItems.filter((item) => item.section === key).length;
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('faq.title')" :description="t('faq.description')" has-back />

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <aside class="flex flex-col gap-4 lg:col-span-1">
        <TrCard padding="sm" class="flex flex-col gap-2xs">
          <TrNavLink
            :label="t('faq.nav.videos')"
            :active="section === 'videos'"
            :count="sectionCount('videos')"
            @click="section = 'videos'"
          />
          <TrNavLink
            :label="t('faq.nav.questions')"
            :active="section === 'faq'"
            :count="sectionCount('faq')"
            @click="section = 'faq'"
          />
          <TrNavLink
            :label="t('faq.nav.support')"
            :active="section === 'support'"
            :count="sectionCount('support')"
            @click="section = 'support'"
          />
        </TrCard>

        <TrCard padding="lg">
          <p class="m-0 text-body-md-medium">{{ t('faq.support.phoneLabel') }}</p>
          <p class="mt-2xs m-0 text-body-sm text-text-soft dark:text-text-dark-soft">
            {{ t('faq.support.phoneValue') }}
          </p>
          <p class="mt-md m-0 text-body-md-medium">{{ t('faq.support.whatsappLabel') }}</p>
          <p class="mt-2xs m-0 text-body-sm text-text-soft dark:text-text-dark-soft">
            {{ t('faq.support.whatsappValue') }}
          </p>
        </TrCard>
      </aside>

      <div class="flex min-w-0 flex-col gap-4 lg:col-span-2">
        <TrCard v-if="visibleItems.length" padding="lg">
          <template #header>
            <h2 class="m-0 text-heading-md">{{ t(sectionTitleKey) }}</h2>
          </template>
          <div class="overflow-hidden rounded-sm">
            <TrAccordion
              v-for="item in visibleItems"
              :key="item.id"
              :title="t(faqItemQuestionKey(item))"
            >
              <div v-html="t(faqItemAnswerKey(item))" />
            </TrAccordion>
          </div>
        </TrCard>

        <p class="m-0 flex items-start gap-sm text-body-sm text-text-soft dark:text-text-dark-soft">
          <TrIcon size="md" class="shrink-0 text-[#451d9a]">
            <InfoFillIcon />
          </TrIcon>
          <span>
            {{ t('faq.notFound') }}
            <RouterLink
              to="/ticket/add"
              class="cursor-pointer font-medium text-[#451d9a] no-underline"
            >
              {{ t('faq.sendTicket') }}
            </RouterLink>
            {{ t('faq.sendTicketAfter') }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
