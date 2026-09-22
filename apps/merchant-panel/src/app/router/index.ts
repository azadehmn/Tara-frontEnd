import { createRouter, createWebHistory } from 'vue-router';
import { installAuthGuard } from './guards/auth.guard';
import { installUnauthorizedHandler } from './guards/unauthorized-handler';
import { AuthLayout, DefaultLayout } from '../layouts';

/** App routes. Feature pages live under `src/pages` / `src/features`. */
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@pages/home/HomePage.vue'),
          meta: { titleKey: 'layout.nav.dashboard', permission: 'user-panel' },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@pages/transactions/TransactionsPage.vue'),
          meta: {
            titleKey: 'layout.nav.transactions',
            permission: ['purchaseReportBusinessPartner', 'org_transactions'],
          },
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
          component: () => import('@pages/reports/SummaryReportPage.vue'),
          meta: { titleKey: 'layout.nav.reportsSummary', permission: 'buysBusinessPartner' },
        },
        {
          path: 'reports/purchase-detail',
          name: 'reports-purchase-detail',
          component: () => import('@pages/reports/PurchaseDetailReportPage.vue'),
          meta: { titleKey: 'layout.nav.reportsPurchaseDetail', permission: 'buysBusinessPartner' },
        },
        {
          path: 'reports/refund',
          name: 'refund',
          component: () => import('@pages/reports/ReturnsReportPage.vue'),
          meta: { titleKey: 'layout.nav.reportsReturns', permission: 'refunds_merchant' },
        },
        {
          path: 'reports/charge-discharge-report',
          name: 'reports-charge-discharge',
          component: () => import('@pages/reports/ChargeDischargeReportPage.vue'),
          meta: {
            titleKey: 'layout.nav.reportsChargeDischarge',
            permission: 'guarantor_charge_and_decharge',
          },
        },
        {
          path: 'reports/users-consume-report',
          name: 'reports-users-consume',
          component: () => import('@pages/reports/UsersConsumeReportPage.vue'),
          meta: {
            titleKey: 'layout.nav.reportsUsersConsume',
            permission: 'consumptionReportGuarantor',
          },
        },
        {
          path: 'reports/account-balance-report',
          name: 'reports-account-balance',
          component: () => import('@pages/reports/AccountBalanceReportPage.vue'),
          meta: {
            titleKey: 'layout.nav.reportsAccountBalance',
            permission: 'org_balance_report',
          },
        },
        {
          path: 'invoices',
          name: 'invoices',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.invoices', permission: 'chekout_acceptor_merchant' },
        },
        {
          path: 'installments',
          name: 'installments',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.installments', permission: 'bnpl_installment' },
        },
        {
          path: 'ads',
          redirect: { name: 'ads-search' },
        },
        {
          path: 'ads/search-ads',
          name: 'ads-search',
          component: () => import('@pages/ads/SearchAdsPage.vue'),
          meta: { titleKey: 'layout.nav.adsSearch' },
        },
        {
          path: 'ads/banner-ads',
          redirect: { name: 'campaign-banner-ads' },
        },
        {
          path: 'ads/click-ads',
          redirect: { name: 'campaign-click-ads' },
        },
        {
          path: 'campaign',
          redirect: { name: 'campaign-banner-ads' },
        },
        {
          path: 'campaign/banner-click-ads',
          redirect: { name: 'campaign-banner-ads' },
        },
        {
          path: 'campaign/banner-ads',
          name: 'campaign-banner-ads',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.campaignBannerAds' },
        },
        {
          path: 'campaign/click-ads',
          name: 'campaign-click-ads',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.campaignClickAds' },
        },
        {
          path: 'ticket',
          name: 'ticket',
          component: () => import('@pages/ticket/TicketPage.vue'),
          meta: { titleKey: 'layout.nav.ticket' },
        },
        {
          path: 'contracts',
          redirect: { name: 'contracts-organization' },
        },
        {
          path: 'contracts/organization',
          name: 'contracts-organization',
          component: () => import('@pages/contracts/OrganizationContractsPage.vue'),
          meta: {
            titleKey: 'layout.nav.contractsOrganization',
            permission: 'contractsGuarantor',
          },
        },
        {
          path: 'contracts/organization/:id',
          name: 'contracts-organization-detail',
          component: () => import('@pages/contracts/OrganizationContractDetailPage.vue'),
          meta: {
            titleKey: 'layout.nav.contractsOrganization',
            permission: 'contractsGuarantor',
          },
        },
        {
          path: 'contracts/acceptor',
          name: 'contracts-acceptor',
          component: () => import('@pages/contracts/AcceptorContractsPage.vue'),
          meta: { titleKey: 'layout.nav.contractsAcceptor', permission: 'contractsMerchant' },
        },
        {
          path: 'contracts/acceptor/:id',
          name: 'contracts-acceptor-detail',
          component: () => import('@pages/contracts/AcceptorContractDetailPage.vue'),
          meta: { titleKey: 'layout.nav.contractsAcceptor', permission: 'contractsMerchant' },
        },
        {
          path: 'demo',
          name: 'demo',
          component: () => import('@pages/demo/DemoPage.vue'),
          meta: { titleKey: 'layout.nav.demo' },
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
      children: [
        {
          path: '',
          redirect: { name: 'login' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@pages/auth/LoginPage.vue'),
          meta: { titleKey: 'auth.login.title', guestOnly: true },
        },
        {
          path: 'otp',
          name: 'otp',
          component: () => import('@pages/auth/OtpPage.vue'),
          meta: { titleKey: 'auth.otp.title', requiresOtpChallenge: true },
        },
      ],
    },
  ],
});

installAuthGuard(router);
installUnauthorizedHandler(router);
