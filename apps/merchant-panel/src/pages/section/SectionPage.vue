<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { t } = useI18n();
const title = computed(() => t(String(route.meta.titleKey ?? 'layout.nav.dashboard')));
</script>

<template>
  <h1 class="text-heading-lg">{{ title }}</h1>
</template>
