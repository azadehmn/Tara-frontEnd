import { createRouter, createWebHistory } from 'vue-router';
import { AuthLayout, DefaultLayout } from './layouts';

/** App routes. Feature pages live under `src/pages` / `src/features`. */
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@pages/home/HomePage.vue'),
          meta: { titleKey: 'layout.nav.dashboard' },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.transactions' },
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.reports' },
        },
        {
          path: 'reports/summary',
          name: 'reports-summary',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.reportsSummary' },
        },
        {
          path: 'reports/purchase-detail',
          name: 'reports-purchase-detail',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.reportsPurchaseDetail' },
        },
        {
          path: 'reports/returns',
          name: 'reports-returns',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.reportsReturns' },
        },
        {
          path: 'invoices',
          name: 'invoices',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.invoices' },
        },
        {
          path: 'contracts',
          redirect: { name: 'contracts-organization' },
        },
        {
          path: 'contracts/organization',
          name: 'contracts-organization',
          component: () => import('@pages/contracts/OrganizationContractsPage.vue'),
          meta: { titleKey: 'layout.nav.contractsOrganization' },
        },
        {
          path: 'contracts/organization/:id',
          name: 'contracts-organization-detail',
          component: () => import('@pages/contracts/OrganizationContractDetailPage.vue'),
          meta: { titleKey: 'layout.nav.contractsOrganization' },
        },
        {
          path: 'contracts/acquiring',
          name: 'contracts-acquiring',
          component: () => import('@pages/contracts/AcquiringContractsPage.vue'),
          meta: { titleKey: 'layout.nav.contractsAcquiring' },
        },
        {
          path: 'contracts/acquiring/:id',
          name: 'contracts-acquiring-detail',
          component: () => import('@pages/contracts/AcquiringContractDetailPage.vue'),
          meta: { titleKey: 'layout.nav.contractsAcquiring' },
        },
        {
          path: 'fonts',
          name: 'fonts-preview',
          component: () => import('@pages/fonts/FontsPreviewPage.vue'),
        },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [],
    },
  ],
});
