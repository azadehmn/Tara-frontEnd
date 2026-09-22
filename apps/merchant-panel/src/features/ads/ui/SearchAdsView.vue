<script setup lang="ts">
import { TrInlineMessage, TrPageHeading, TrCard } from '@tara/ui';
import SearchAdsPromoBanner from './SearchAdsPromoBanner.vue';

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="t('ads.search.title')" />

    <SearchAdsPromoBanner />

    <TrCard>
      <TrInlineMessage
        type="neutral"
        :description="t('ads.search.intro')"
        :title="t('ads.search.description')"
      />
    </TrCard>
  </div>
</template>
