<template>
  <div class="theme-sketch" :class="`theme-sketch--${tone}`">
    <span class="theme-sketch__rail" />
    <span class="theme-sketch__stage">
      <span class="theme-sketch__accent" />
      <span class="theme-sketch__chip" />
      <span class="theme-sketch__line" />
      <span class="theme-sketch__line theme-sketch__line--short" />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tone: 'light' | 'dark';
}>();
</script>

<style scoped>
.theme-sketch {
  display: flex;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  gap: 4px;
  padding: 6px;
}

.theme-sketch--light {
  background: linear-gradient(180deg, #edf3ff 0%, #f7f9ff 100%);
}

.theme-sketch--dark {
  background: #1b2448;
}

.theme-sketch__rail {
  width: 18%;
  border-radius: 8px;
}

.theme-sketch--light .theme-sketch__rail {
  background: #d7e4ff;
}

.theme-sketch--dark .theme-sketch__rail {
  background: #121936;
}

.theme-sketch__stage {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  padding-top: 1px;
}

.theme-sketch__accent {
  height: 6px;
  width: 42%;
  border-radius: 999px;
}

.theme-sketch--light .theme-sketch__accent {
  background: #4c6fff;
}

.theme-sketch--dark .theme-sketch__accent {
  background: #5b7cff;
}

.theme-sketch__chip {
  align-self: flex-end;
  height: 5px;
  width: 22%;
  border-radius: 999px;
}

.theme-sketch--light .theme-sketch__chip {
  background: #d9e4fb;
}

.theme-sketch--dark .theme-sketch__chip {
  background: #2c365f;
}

.theme-sketch__line {
  height: 12px;
  border-radius: 4px;
}

.theme-sketch--light .theme-sketch__line {
  background: #e7eefc;
}

.theme-sketch--dark .theme-sketch__line {
  background: #2a335c;
}

.theme-sketch__line--short {
  width: 72%;
  height: 7px;
}
</style>
