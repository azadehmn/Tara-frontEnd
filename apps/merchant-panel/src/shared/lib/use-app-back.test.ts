import { defineComponent } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import { describe, expect, it } from 'vitest';
import { createAppBack } from './use-app-back';

const Blank = defineComponent({ template: '<div />' });

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/dashboard', name: 'dashboard', component: Blank },
      { path: '/contracts/organization', name: 'contracts-organization', component: Blank },
      { path: '/contracts/organization/:id', name: 'contracts-organization-detail', component: Blank },
    ],
  });
}

describe('createAppBack', () => {
  it('replaces to the dashboard when this tab has no in-app history', async () => {
    const router = createTestRouter();
    const { goBack } = createAppBack(router);

    await router.push('/contracts/organization/12');
    await goBack();

    expect(router.currentRoute.value.name).toBe('dashboard');
  });

  it('returns to the previous route and keeps its query', async () => {
    const router = createTestRouter();
    const { goBack } = createAppBack(router);

    await router.push('/dashboard');
    await router.push({ name: 'contracts-organization', query: { q: 'acme' } });
    await router.push({ name: 'contracts-organization-detail', params: { id: '9' } });

    await goBack();

    expect(router.currentRoute.value.fullPath).toBe('/contracts/organization?q=acme');
  });

  it('does nothing on the dashboard when there is no in-app history', async () => {
    const router = createTestRouter();
    const { goBack } = createAppBack(router);

    await router.push('/dashboard');
    await goBack();

    expect(router.currentRoute.value.fullPath).toBe('/dashboard');
  });
});
