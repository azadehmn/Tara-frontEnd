<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { TrButton, TrIcon, TrPageHeading } from '@tara/ui';
import AddIcon from '@tara/ui/icons/AddIcon.vue';
import { CampaignKpiCard, CampaignListView, type CampaignKind } from '@features/campaigns';

const route = useRoute();
const { t } = useI18n();
const title = computed(() => t(String(route.meta.titleKey ?? 'layout.nav.campaigns')));
const kind = computed<CampaignKind>(() =>
  route.name === 'campaign-click-ads' ? 'click' : 'banner',
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <TrPageHeading :title="title">
      <template #action>
        <TrButton :text="t('campaign.create')">
          <template #before-icon>
            <TrIcon size="md">
              <AddIcon />
            </TrIcon>
          </template>
        </TrButton>
      </template>
    </TrPageHeading>
    <CampaignKpiCard :kind="kind" />
    <CampaignListView :kind="kind" />
  </div>
</template>
