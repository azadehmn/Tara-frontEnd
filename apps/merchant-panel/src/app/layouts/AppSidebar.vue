<script setup lang="ts">
import { computed, reactive, watch, type Component } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { TrIcon } from '@tara/ui';
import TrContractsIcon from '@tara/ui/icons/ContractsIcon.vue';
import TrGridLayoutIcon from '@tara/ui/icons/GridLayoutIcon.vue';
import TrInvoicesIcon from '@tara/ui/icons/InvoicesIcon.vue';
import TrMegaphoneIcon from '@tara/ui/icons/MegaphoneIcon.vue';
import TrReportsIcon from '@tara/ui/icons/ReportsIcon.vue';
import TrTicketIcon from '@tara/ui/icons/TicketIcon.vue';
import TrTransactionIcon from '@tara/ui/icons/TransactionIcon.vue';
import { useAuthoritiesStore } from '@features/auth';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const authorities = useAuthoritiesStore();

type NavPermission = string | string[];

type NavChild = {
  to?: string;
  key: string;
  permission?: NavPermission;
  children?: NavChild[];
};

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
    key: 'adsAndPromotions',
    icon: TrMegaphoneIcon,
    separated: true,
    children: [
      { to: '/ads/search-ads', key: 'adsSearch' },
      {
        key: 'campaigns',
        children: [
          { to: '/campaign/banner-ads', key: 'campaignBannerAds' },
          { to: '/campaign/click-ads', key: 'campaignClickAds' },
        ],
      },
    ],
  },
  { to: '/ticket', key: 'ticket', icon: TrTicketIcon },
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

function filterChildren(children?: NavChild[]): NavChild[] {
  if (!children?.length) return [];
  return children.flatMap((child) => {
    if (child.children?.length) {
      const nested = filterChildren(child.children);
      return nested.length ? [{ ...child, children: nested }] : [];
    }
    return isAllowed(child.permission) ? [child] : [];
  });
}

function isPathActive(to: string | undefined, path: string) {
  return Boolean(to && (path === to || path.startsWith(`${to}/`)));
}

function isChildRouteActive(children: NavChild[] | undefined, path = route.path): boolean {
  return Boolean(
    children?.some(
      (child) => isPathActive(child.to, path) || isChildRouteActive(child.children, path),
    ),
  );
}

function firstLeafTo(children: NavChild[] | undefined): string | undefined {
  if (!children?.length) return;
  const child = children[0];
  return child.to ?? firstLeafTo(child.children);
}

function findChildrenByKey(key: string, nodes: Array<NavItem | NavChild> = items.value): NavChild[] | undefined {
  for (const node of nodes) {
    if (node.key === key) return node.children;
    const nested = node.children ? findChildrenByKey(key, node.children) : undefined;
    if (nested) return nested;
  }
}

const items = computed(() => {
  void authorities.items;
  return allItems.flatMap((item) => {
    if (!item.children) return isAllowed(item.permission) ? [item] : [];

    const children = filterChildren(item.children);
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
    const to = firstLeafTo(findChildrenByKey(key));
    if (to) router.push(to);
    return;
  }
  openMenus[key] = !openMenus[key];
}

const linkClass =
  'flex items-center gap-2 rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800';
const activeClass = 'tr-nav-bar__item-active';
const separatorClass = 'mt-1 border-t border-solid border-[#e4e7ec] pt-1 dark:border-gray-800';

watch(
  [() => route.path, items],
  ([path]) => {
    for (const item of items.value) {
      if (isChildRouteActive(item.children, path)) openMenus[item.key] = true;
      for (const child of item.children ?? []) {
        if (child.children && isChildRouteActive(child.children, path)) {
          openMenus[child.key] = true;
        }
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
            <template v-for="child in item.children" :key="child.key">
              <div v-if="child.children?.length" class="flex flex-col gap-2xs">
                <button
                  type="button"
                  :class="[
                    linkClass,
                    'tr-nav-bar__subitem w-full',
                    isChildRouteActive(child.children) && [activeClass, 'tr-nav-bar__parent-active'],
                  ]"
                  :aria-expanded="Boolean(openMenus[child.key])"
                  @click="toggleMenu(child.key, $event)"
                >
                  <span class="tr-nav-bar__label min-w-0 flex-1 text-start">
                    {{ t(`layout.nav.${child.key}`) }}
                  </span>
                  <span
                    class="tr-nav-bar__chevron ms-auto inline-flex size-6 shrink-0 items-center justify-center"
                  >
                    <svg class="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        :d="openMenus[child.key] ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div class="tr-nav-bar__submenu" :class="{ 'is-open': openMenus[child.key] }">
                  <div class="tr-nav-bar__submenu-inner">
                    <RouterLink
                      v-for="leaf in child.children"
                      :key="leaf.key"
                      v-slot="{ href, navigate, isActive }"
                      :to="leaf.to!"
                      custom
                    >
                      <a
                        :href="href"
                        :class="[
                          linkClass,
                          'tr-nav-bar__subitem tr-nav-bar__subitem--nested',
                          isActive && activeClass,
                        ]"
                        @click="navigate"
                      >
                        <span class="tr-nav-bar__label">{{ t(`layout.nav.${leaf.key}`) }}</span>
                      </a>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <RouterLink
                v-else
                v-slot="{ href, navigate, isActive }"
                :to="child.to!"
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
            </template>
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
