import { createRouter, createWebHistory } from 'vue-router';

/** App routes. Feature pages live under `src/pages` / `src/features`. */
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@pages/home/HomePage.vue'),
    },
  ],
});
