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
          path: 'invoices',
          name: 'invoices',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.invoices' },
        },
        {
          path: 'contracts',
          name: 'contracts',
          component: () => import('@pages/section/SectionPage.vue'),
          meta: { titleKey: 'layout.nav.contracts' },
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
