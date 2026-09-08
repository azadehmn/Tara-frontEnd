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
          name: 'home',
          component: () => import('@pages/home/HomePage.vue'),
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
