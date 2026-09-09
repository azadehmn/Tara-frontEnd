<script setup lang="ts">
import { reactive, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import SidebarNavIcon, { type SidebarNavIconName } from './SidebarNavIcon.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

type NavChild = { to: string; key: string };

type NavItem = {
  to?: string;
  key: SidebarNavIconName;
  exact?: boolean;
  children?: NavChild[];
};

const items: NavItem[] = [
  { to: '/', key: 'dashboard', exact: true },
  { to: '/transactions', key: 'transactions' },
  {
    key: 'reports',
    children: [
      { to: '/reports/summary', key: 'reportsSummary' },
      { to: '/reports/purchase-detail', key: 'reportsPurchaseDetail' },
      { to: '/reports/returns', key: 'reportsReturns' },
    ],
  },
  { to: '/invoices', key: 'invoices' },
  {
    key: 'contracts',
    children: [{ to: '/contracts/acquiring', key: 'contractsAcquiring' }],
  },
];

const openMenus = reactive<Record<string, boolean>>({});

function toggleMenu(key: string, event: MouseEvent) {
  const inCollapsedRail = Boolean(
    (event.currentTarget as HTMLElement).closest('.tr-nav-bar.is-collapsed'),
  );
  if (inCollapsedRail) {
    const firstChild = items.find((item) => item.key === key)?.children?.[0];
    if (firstChild) router.push(firstChild.to);
    return;
  }
  openMenus[key] = !openMenus[key];
}

const linkClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';
const activeClass = 'bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark';

function isChildRouteActive(children: NavChild[] | undefined) {
  return Boolean(
    children?.some((child) => route.path === child.to || route.path.startsWith(`${child.to}/`)),
  );
}

watch(
  () => route.path,
  (path) => {
    for (const item of items) {
      if (item.children?.some((child) => path === child.to || path.startsWith(`${child.to}/`))) {
        openMenus[item.key] = true;
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <nav class="flex flex-col gap-1" :aria-label="t('layout.nav.label')">
    <template v-for="item in items" :key="item.key">
      <div v-if="item.children?.length" class="flex flex-col gap-1">
        <button
          type="button"
          :class="[linkClass, 'w-full', isChildRouteActive(item.children) && 'tr-nav-bar__parent-active']"
          :aria-expanded="Boolean(openMenus[item.key])"
          @click="toggleMenu(item.key, $event)"
        >
          <SidebarNavIcon :name="item.key" />
          <span class="tr-nav-bar__label min-w-0 flex-1 text-start">
            {{ t(`layout.nav.${item.key}`) }}
          </span>
          <span class="tr-nav-bar__chevron ms-auto inline-flex size-6 shrink-0 items-center justify-center">
            <svg class="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                :d="openMenus[item.key] ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </button>
        <div
          class="tr-nav-bar__submenu"
          :class="{ 'is-open': openMenus[item.key] }"
        >
          <div class="tr-nav-bar__submenu-inner">
            <RouterLink
              v-for="child in item.children"
              :key="child.key"
              v-slot="{ href, navigate, isActive }"
              :to="child.to"
              custom
            >
              <a
                :href="href"
                :class="[linkClass, 'tr-nav-bar__subitem', isActive && activeClass]"
                @click="navigate"
              >
                <span class="tr-nav-bar__label">{{ t(`layout.nav.${child.key}`) }}</span>
              </a>
            </RouterLink>
          </div>
        </div>
      </div>

      <RouterLink
        v-else
        v-slot="{ href, navigate, isActive, isExactActive }"
        :to="item.to!"
        custom
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
    </template>
  </nav>
</template>
