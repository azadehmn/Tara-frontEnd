<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { TrPageHeading } from '@tara/ui';

const route = useRoute();
const { t } = useI18n();
const title = computed(() => t(String(route.meta.titleKey ?? 'layout.nav.dashboard')));
</script>

<template>
  <TrPageHeading :title="title" />
</template>
