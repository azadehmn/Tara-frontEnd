<script setup lang="ts">
export type SidebarNavIconName =
  | 'dashboard'
  | 'transactions'
  | 'reports'
  | 'invoices'
  | 'contracts';

defineProps<{ name: SidebarNavIconName }>();
</script>

<template>
  <svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <g
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="name === 'dashboard'">
        <rect x="2" y="2" width="5" height="5" rx="1" />
        <rect x="9" y="2" width="5" height="5" rx="1" />
        <rect x="2" y="9" width="5" height="5" rx="1" />
        <rect x="9" y="9" width="5" height="5" rx="1" />
      </template>
      <template v-else-if="name === 'transactions'">
        <path d="M3 5.5h10M11 3l2.5 2.5L11 8" />
        <path d="M13 10.5H3M5 13 2.5 10.5 5 8" />
      </template>
      <template v-else-if="name === 'reports'">
        <path d="M3 13V8" />
        <path d="M6.5 13V4" />
        <path d="M10 13V6.5" />
        <path d="M13.5 13V3" />
      </template>
      <template v-else-if="name === 'invoices'">
        <path d="M4.5 2.5h5.2L13.5 6v8.5h-9V2.5Z" />
        <path d="M9.5 2.5V6h3.5" />
        <path d="M6 9h4.5M6 11.5h3" />
      </template>
      <template v-else>
        <path d="M4.5 2.5h7v11h-7z" />
        <path d="M6.5 5.5h3M6.5 8h3M6.5 10.5h2" />
      </template>
    </g>
  </svg>
</template>
