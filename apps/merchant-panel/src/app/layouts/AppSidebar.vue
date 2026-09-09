<script setup lang="ts">
import { RouterLink } from 'vue-router';
import SidebarNavIcon, { type SidebarNavIconName } from './SidebarNavIcon.vue';

const { t } = useI18n();

const items: { to: string; key: SidebarNavIconName; exact?: boolean }[] = [
  { to: '/', key: 'dashboard', exact: true },
  { to: '/transactions', key: 'transactions' },
  { to: '/reports', key: 'reports' },
  { to: '/invoices', key: 'invoices' },
  { to: '/contracts', key: 'contracts' },
];

const linkClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';
const activeClass = 'bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark';
</script>

<template>
  <nav class="flex flex-col gap-1" :aria-label="t('layout.nav.label')">
    <RouterLink
      v-for="item in items"
      :key="item.key"
      :to="item.to"
      custom
      v-slot="{ href, navigate, isActive, isExactActive }"
    >
      <a
        :href="href"
        :class="[linkClass, (item.exact ? isExactActive : isActive) && activeClass]"
        :aria-label="t(`layout.nav.${item.key}`)"
        @click="navigate"
      >
        <SidebarNavIcon :name="item.key" />
        <span class="tr-nav-bar__label">{{ t(`layout.nav.${item.key}`) }}</span>
      </a>
    </RouterLink>
  </nav>
</template>
