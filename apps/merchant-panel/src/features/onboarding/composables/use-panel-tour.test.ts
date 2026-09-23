import { defineComponent, nextTick } from 'vue';
import { createMemoryHistory, createRouter, type Router } from 'vue-router';
import { createI18n } from 'vue-i18n';
import { createPinia, setActivePinia } from 'pinia';
import { mount, flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuthoritiesStore } from '@features/auth';
import { useAppLoading } from '@shared/lib';
import type { TourStep } from '../model/tour';
import { tourReplayNonce } from '../lib/tour-request';
import { usePanelTour } from './use-panel-tour';

const startTour = vi.fn();
const destroyActiveTour = vi.fn();
const hasCompletedOnboarding = vi.fn();
const markOnboardingCompleted = vi.fn();
const alwaysShowTour = vi.hoisted(() => ({ value: false }));

vi.mock('../lib/start-tour', () => ({
  startTour: (...args: unknown[]) => startTour(...args),
  destroyActiveTour: (...args: unknown[]) => destroyActiveTour(...args),
  getActiveTourIndex: () => undefined,
  moveActiveTour: () => undefined,
}));

vi.mock('../lib/onboarding-storage', () => ({
  hasCompletedOnboarding: (...args: unknown[]) => hasCompletedOnboarding(...args),
  markOnboardingCompleted: (...args: unknown[]) => markOnboardingCompleted(...args),
}));

vi.mock('../config/data-source', () => ({
  get ALWAYS_SHOW_TOUR() {
    return alwaysShowTour.value;
  },
}));

const Blank = { name: 'Blank', template: '<div />' };

function createTestRouter(): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/dashboard', name: 'dashboard', component: Blank },
      { path: '/contracts/organization', name: 'contracts-organization', component: Blank },
      { path: '/contracts/acceptor', name: 'contracts-acceptor', component: Blank },
      { path: '/ticket', name: 'ticket', component: Blank },
    ],
  });
}

function mountTour(router: Router, permissions: string[] = []) {
  const pinia = createPinia();
  setActivePinia(pinia);
  if (permissions.length) {
    useAuthoritiesStore().setItems(permissions.map((key) => ({ key })));
  }
  const Host = defineComponent({
    setup() {
      usePanelTour();
      return () => null;
    },
  });
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    missing: (_locale, key) => key,
    messages: { en: {} },
  });

  return mount(Host, {
    global: {
      plugins: [pinia, router, i18n],
    },
  });
}

describe('usePanelTour', () => {
  beforeEach(() => {
    startTour.mockReset();
    destroyActiveTour.mockReset();
    hasCompletedOnboarding.mockReset();
    markOnboardingCompleted.mockReset();
    startTour.mockImplementation((options: { steps?: TourStep[] }) => options.steps ?? null);
    hasCompletedOnboarding.mockReturnValue(false);
    alwaysShowTour.value = false;
    tourReplayNonce.value = 0;
    useAppLoading().hide();
    vi.stubGlobal(
      'requestAnimationFrame',
      (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('starts the dashboard tour once on the first visit', async () => {
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).toHaveBeenCalledTimes(1);
    expect(startTour.mock.calls[0]?.[0]).toMatchObject({
      nextLabel: 'onboarding.actions.next',
      doneLabel: 'onboarding.actions.done',
    });
    expect(startTour.mock.calls[0]?.[0].steps[0].element).toBe('[data-tour="profile"]');

    startTour.mock.calls[0]?.[0].onComplete();
    expect(markOnboardingCompleted).toHaveBeenCalledWith('tara:onboarding:dashboard:v2');

    wrapper.unmount();
  });

  it('does not start a completed tour version again', async () => {
    hasCompletedOnboarding.mockReturnValue(true);
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('waits for the splash overlay before starting', async () => {
    const { show, hide } = useAppLoading();
    show();
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).not.toHaveBeenCalled();

    hide();
    await flushPromises();
    await nextTick();

    expect(startTour).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('does not replay after the done button, even when ALWAYS_SHOW is enabled', async () => {
    alwaysShowTour.value = true;
    hasCompletedOnboarding.mockReturnValue(false);
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).toHaveBeenCalledTimes(1);
    startTour.mock.calls[0]?.[0].onComplete();
    expect(markOnboardingCompleted).toHaveBeenCalledWith('tara:onboarding:dashboard:v2');

    hasCompletedOnboarding.mockReturnValue(true);
    await router.push('/ticket');
    await router.push('/dashboard');
    await flushPromises();
    await nextTick();

    expect(startTour).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('replays a completed tour from the guide button', async () => {
    hasCompletedOnboarding.mockReturnValue(true);
    const router = createTestRouter();
    await router.push('/ticket');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).not.toHaveBeenCalled();

    tourReplayNonce.value += 1;
    await flushPromises();
    await nextTick();

    expect(router.currentRoute.value.name).toBe('dashboard');
    expect(startTour).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('does not run the dashboard tour on other routes', async () => {
    const router = createTestRouter();
    await router.push('/ticket');
    const wrapper = mountTour(router);
    await flushPromises();
    await nextTick();

    expect(startTour).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('opens contracts as the next step instead of ending on the dashboard', async () => {
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router, ['contractsMerchant']);
    await flushPromises();
    await nextTick();

    const options = startTour.mock.calls[0]?.[0] as {
      steps: TourStep[];
      prepareStep: (step: TourStep) => Promise<void>;
    };
    const list = options.steps.find((step) => step.element === '[data-tour="contract-list"]');
    expect(list?.routeNames).toEqual(['contracts-organization', 'contracts-acceptor']);
    expect(options.steps.find((step) => step.element === '[data-tour="contracts"]')?.advanceOnClick).toBe(
      true,
    );

    const destroysBeforeNavigation = destroyActiveTour.mock.calls.length;
    await options.prepareStep(list!);
    await flushPromises();

    expect(router.currentRoute.value.name).toBe('contracts-acceptor');
    expect(markOnboardingCompleted).not.toHaveBeenCalled();
    expect(destroyActiveTour).toHaveBeenCalledTimes(destroysBeforeNavigation);
    wrapper.unmount();
  });

  it('drops the contracts step when the user cannot open either route', async () => {
    const router = createTestRouter();
    await router.push('/dashboard');
    const wrapper = mountTour(router, ['user-panel']);
    await flushPromises();
    await nextTick();

    const steps = startTour.mock.calls[0]?.[0].steps as TourStep[];
    expect(steps.map((step) => step.element)).not.toContain('[data-tour="contract-list"]');
    wrapper.unmount();
  });
});
