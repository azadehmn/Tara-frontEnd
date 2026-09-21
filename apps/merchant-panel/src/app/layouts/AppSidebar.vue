<script setup lang="ts">
import { computed, reactive, watch, type Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { TrIcon } from '@tara/ui';
import TrContractsIcon from '@tara/ui/icons/ContractsIcon.vue';
import TrGridLayoutIcon from '@tara/ui/icons/GridLayoutIcon.vue';
import TrInvoicesIcon from '@tara/ui/icons/InvoicesIcon.vue';
import TrReportsIcon from '@tara/ui/icons/ReportsIcon.vue';
import TrTicketIcon from '@tara/ui/icons/TicketIcon.vue';
import TrTransactionIcon from '@tara/ui/icons/TransactionIcon.vue';
import { useAuthoritiesStore } from '@features/auth';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authorities = useAuthoritiesStore();

type NavPermission = string | string[];

type NavChild = { to: string; key: string; permission?: NavPermission };

type NavItem = {
  to?: string;
  key: string;
  icon: Component;
  exact?: boolean;
  permission?: NavPermission;
  titleKey?: string;
  separated?: boolean;
  children?: NavChild[];
};

const allItems: NavItem[] = [
  { to: '/', key: 'dashboard', icon: TrGridLayoutIcon, exact: true, permission: 'user-panel' },
  {
    key: 'contracts',
    icon: TrContractsIcon,
    children: [
      { to: '/contracts/organization', key: 'contractsOrganization', permission: 'contractsGuarantor' },
      { to: '/contracts/acceptor', key: 'contractsAcceptor', permission: 'contractsMerchant' },
    ],
  },
  {
    to: '/transactions',
    key: 'transactions',
    icon: TrTransactionIcon,
    permission: ['purchaseReportBusinessPartner', 'org_transactions'],
  },
  {
    key: 'reports',
    icon: TrReportsIcon,
    children: [
      { to: '/reports/summary', key: 'reportsSummary', permission: 'buysBusinessPartner' },
      {
        to: '/reports/purchase-detail',
        key: 'reportsPurchaseDetail',
        permission: 'buysBusinessPartner',
      },
      { to: '/reports/refund', key: 'reportsReturns', permission: 'refunds_merchant' },
      {
        to: '/reports/charge-discharge-report',
        key: 'reportsChargeDischarge',
        permission: 'guarantor_charge_and_decharge',
      },
      {
        to: '/reports/users-consume-report',
        key: 'reportsUsersConsume',
        permission: 'consumptionReportGuarantor',
      },
      {
        to: '/reports/account-balance-report',
        key: 'reportsAccountBalance',
        permission: 'org_balance_report',
      },
    ],
  },
  {
    to: '/invoices',
    key: 'invoices',
    icon: TrInvoicesIcon,
    permission: 'chekout_acceptor_merchant',
  },
  {
    to: '/installments',
    key: 'installments',
    icon: TrInvoicesIcon,
    permission: 'bnpl_installment',
  },
  {
    to: '/ticket',
    key: 'ticket',
    icon: TrTicketIcon,
    separated: true,
  },
];

function isAllowed(permission?: NavPermission) {
  if (!permission) return true;
  const keys = Array.isArray(permission) ? permission : [permission];
  return keys.some((key) => authorities.has(key));
}

function reportsTitleKey() {
  if (authorities.has('org_transactions')) return 'reportsOrg';
  if (authorities.has('purchaseReportBusinessPartner')) return 'reportsAcceptor';
  return 'reports';
}

const items = computed(() => {
  void authorities.items;
  return allItems.flatMap((item) => {
    if (!item.children) return isAllowed(item.permission) ? [item] : [];

    const children = item.children.filter((child) => isAllowed(child.permission));
    if (!children.length) return [];

    return [
      {
        ...item,
        children,
        titleKey: item.key === 'reports' ? reportsTitleKey() : item.key,
      },
    ];
  });
});

const openMenus = reactive<Record<string, boolean>>({});

function toggleMenu(key: string, event: MouseEvent) {
  const inCollapsedRail = Boolean(
    (event.currentTarget as HTMLElement).closest('.tr-nav-bar.is-collapsed'),
  );
  if (inCollapsedRail) {
    const firstChild = items.value.find((item) => item.key === key)?.children?.[0];
    if (firstChild) router.push(firstChild.to);
    return;
  }
  openMenus[key] = !openMenus[key];
}

const linkClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';
const activeClass = 'bg-primary/10 text-primary dark:bg-primary-dark/20 dark:text-primary-dark';
const separatorClass = 'mt-1 border-t border-solid border-[#e4e7ec] pt-1 dark:border-gray-800';

function isChildRouteActive(children: NavChild[] | undefined) {
  return Boolean(
    children?.some((child) => route.path === child.to || route.path.startsWith(`${child.to}/`)),
  );
}

watch(
  [() => route.path, items],
  ([path]) => {
    for (const item of items.value) {
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
      <div
        v-if="item.children?.length"
        class="flex flex-col gap-1"
        :class="item.separated && separatorClass"
      >
        <button
          type="button"
          :class="[
            linkClass,
            'w-full',
            isChildRouteActive(item.children) && [activeClass, 'tr-nav-bar__parent-active'],
          ]"
          :aria-expanded="Boolean(openMenus[item.key])"
          @click="toggleMenu(item.key, $event)"
        >
          <TrIcon size="md">
            <component :is="item.icon" />
          </TrIcon>
          <span class="tr-nav-bar__label min-w-0 flex-1 text-start">
            {{ t(`layout.nav.${item.titleKey ?? item.key}`) }}
          </span>
          <span
            class="tr-nav-bar__chevron ms-auto inline-flex size-6 shrink-0 items-center justify-center"
          >
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
        <div class="tr-nav-bar__submenu" :class="{ 'is-open': openMenus[item.key] }">
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

      <div v-else :class="item.separated && separatorClass">
        <RouterLink v-slot="{ href, navigate, isActive, isExactActive }" :to="item.to!" custom>
          <a
            :href="href"
            :class="[linkClass, (item.exact ? isExactActive : isActive) && activeClass]"
            :aria-label="t(`layout.nav.${item.titleKey ?? item.key}`)"
            @click="navigate"
          >
            <TrIcon size="md">
              <component :is="item.icon" />
            </TrIcon>
            <span class="tr-nav-bar__label">{{ t(`layout.nav.${item.titleKey ?? item.key}`) }}</span>
          </a>
        </RouterLink>
      </div>
    </template>
  </nav>
</template>
