<script setup lang="ts">
import { computed } from 'vue';
import {
  TrAction,
  TrCard,
  TrStatus,
  TrTable,
  type TrActionItem,
  type TrTableColumn,
} from '@tara/ui';
import DetailsIcon from '@tara/ui/icons/DetailsIcon.vue';
import { bannerCampaigns, clickCampaigns } from '../config/sample-campaigns';
import { campaignStatusLabelKey, campaignStatusType } from '../lib/campaign-status';
import type { Campaign, CampaignKind } from '../model/campaign';

const props = defineProps<{
  kind: CampaignKind;
}>();

const { t } = useI18n();

const items = computed(() => (props.kind === 'click' ? clickCampaigns : bannerCampaigns));

const columns = computed<TrTableColumn[]>(() => [
  { name: 'name', label: t('campaign.fields.name'), width: 'minmax(180px, 1.2fr)' },
  { name: 'type', label: t('campaign.fields.type'), width: 'minmax(100px, 0.5fr)' },
  { name: 'placement', label: t('campaign.fields.placement'), width: 'minmax(140px, 0.7fr)' },
  { name: 'status', label: t('campaign.fields.status'), width: 'minmax(140px, 0.7fr)' },
]);

function rowActions(_item: Campaign): TrActionItem[] {
  return [
    {
      id: 'details',
      label: t('campaign.actions.details'),
      icon: DetailsIcon,
      command: () => undefined,
    },
  ];
}
</script>

<template>
  <TrCard>
    <TrTable
      :columns="columns"
      :items="items"
      :title="t('common.empty')"
      vector="NoResult"
      card-header-column="name"
      card-header-addon-column="status"
    >
      <template #item-type="{ item }">
        {{ t(`campaign.types.${item.type}`) }}
      </template>
      <template #item-placement="{ item }">
        {{ t(`campaign.placements.${item.placement}`) }}
      </template>
      <template #item-status="{ item }">
        <TrStatus
          :type="campaignStatusType(item.status)"
          :text="t(campaignStatusLabelKey(item.status))"
        />
      </template>
      <template #action="{ item }">
        <TrAction :aria-label="t('common.actions')" :items="rowActions(item)" />
      </template>
    </TrTable>
  </TrCard>
</template>
