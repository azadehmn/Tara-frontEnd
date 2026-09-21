<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-heading-lg text-text dark:text-text-dark">
      {{ t('ticket.title') }}
    </h1>
    <p class="mt-2xs text-body-sm text-text-soft dark:text-text-dark-soft">
      {{ t('ticket.description') }}
    </p>
    <p class="mt-lg max-w-xl text-body-md text-text dark:text-text-dark">
      {{ t('ticket.body') }}
    </p>
  </div>
</template>
