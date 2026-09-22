<script setup lang="ts">
import { TrIcon } from '../icon';
import { TrLabel } from '../label';
import { TrStatus } from '../status';
import { TrTooltip } from '../tooltip';
import type { TrSummaryProps } from './Summary';

defineOptions({ name: 'TrSummary' });

withDefaults(defineProps<TrSummaryProps>(), {
  items: () => [],
  loading: false,
  divider: 'dashed',
});
</script>

<template>
  <div class="tr-summary">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="tr-summary__row"
      :class="item.itemClass"
    >
      <div
        class="tr-summary__value"
        :class="{ 'tr-summary__value--rest': index > 0 }"
      >
        <span
          v-if="loading"
          class="tr-summary__skeleton tr-summary__skeleton--value"
          aria-hidden="true"
        />
        <TrStatus
          v-else-if="item.status"
          :type="item.status.type"
          :text="item.status.text"
        />
        <template v-else>
          <TrTooltip v-if="item.description && item.valueIcon" :content="item.description" placement="top">
            <TrIcon size="sm">
              <component :is="item.valueIcon" />
            </TrIcon>
          </TrTooltip>
          <TrIcon v-else-if="item.valueIcon" size="sm">
            <component :is="item.valueIcon" />
          </TrIcon>
          <span>{{ item.value }}</span>
          <TrLabel
            v-if="item.valueLabel"
            :text="item.valueLabel"
            :type="item.valueLabelType ?? 'neutral'"
          />
        </template>
      </div>

      <span
        v-if="divider !== 'none'"
        class="tr-summary__rule"
        :class="`tr-summary__rule--${divider}`"
        aria-hidden="true"
      />

      <div class="tr-summary__title">
        <span
          v-if="loading"
          class="tr-summary__skeleton tr-summary__skeleton--title"
          aria-hidden="true"
        />
        <template v-else>
          <TrTooltip v-if="item.description" :content="item.description" placement="top">
            <TrIcon v-if="item.icon" size="sm">
              <component :is="item.icon" />
            </TrIcon>
          </TrTooltip>
          <TrIcon v-else-if="item.icon" size="sm">
            <component :is="item.icon" />
          </TrIcon>
          <span>{{ item.title }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style src="./styles.css"></style>
