<script setup lang="ts">
import { RouterView } from 'vue-router';
import { AppLoadingOverlay } from '@shared/ui';
</script>

<template>
  <RouterView />
  <AppLoadingOverlay />
</template>
