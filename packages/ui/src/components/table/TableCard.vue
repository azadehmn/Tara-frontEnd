<script setup lang="ts">
defineOptions({ name: 'TrTableCard' });

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <div class="tr-table-card" @click="$emit('click', $event)">
    <div v-if="$slots.header" class="tr-table-card__header">
      <slot name="header" />
    </div>
    <div v-if="$slots.main || $slots.default" class="tr-table-card__main">
      <slot name="main">
        <slot />
      </slot>
    </div>
    <div v-if="$slots.footer" class="tr-table-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style src="./tableCard.css"></style>
