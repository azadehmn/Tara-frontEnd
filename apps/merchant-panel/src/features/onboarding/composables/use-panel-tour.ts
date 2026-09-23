import { nextTick, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthoritiesStore } from '@features/auth';
import { useAppLoading } from '@shared/lib';
import { ALWAYS_SHOW_TOUR } from '../config/data-source';
import { panelTours, tourRoutePermissions } from '../config/panel-tours';
import { hasCompletedOnboarding, markOnboardingCompleted } from '../lib/onboarding-storage';
import { firstVisibleTourTarget } from '../lib/resolve-tour-steps';
import {
  destroyActiveTour,
  getActiveTourIndex,
  moveActiveTour,
  startTour,
} from '../lib/start-tour';
import { tourReplayNonce } from '../lib/tour-request';
import { tourStorageKey, type TourDefinition, type TourStep } from '../model/tour';

export type UsePanelTourOptions = {
  prepare?: () => void | Promise<void>;
};

const TARGET_FRAMES = 30;

export function usePanelTour(options: UsePanelTourOptions = {}) {
  const route = useRoute();
  const router = useRouter();
  const authorities = useAuthoritiesStore();
  const { t } = useI18n();
  const { isLoading } = useAppLoading();
  const startedKeys = new Set<string>();
  let startToken = 0;
  let handoff = false;
  let journey: { homeRoutes: readonly string[]; steps: TourStep[] } | null = null;

  function routeAllowed(name: string): boolean {
    const permission = tourRoutePermissions[name];
    if (!permission || !authorities.loaded) return true;
    return authorities.has(permission);
  }

  function stepAllowed(step: TourStep): boolean {
    if (!step.routeNames?.length) return true;
    if (!authorities.loaded) return true;
    return step.routeNames.some((name) => routeAllowed(name));
  }

  function pickDestination(names: readonly string[]): string | undefined {
    const current = String(route.name ?? '');
    if (names.includes(current)) return;
    if (!authorities.loaded) return names[0];
    return names.find((name) => routeAllowed(name));
  }

  async function prepareStep(step: TourStep): Promise<void> {
    const visible = Boolean(firstVisibleTourTarget(step.element));
    const names = step.routeNames?.length
      ? step.routeNames
      : visible
        ? []
        : (journey?.homeRoutes ?? []);
    const target = names.length ? pickDestination(names) : undefined;
    if (!target) return;

    handoff = true;
    try {
      await router.push({ name: target });
      await nextTick();
      await waitForPaint();
      await waitForTourTarget(step.element);
    } finally {
      await nextTick();
      handoff = false;
    }
  }

  async function maybeStart(force = false): Promise<void> {
    const token = ++startToken;
    destroyActiveTour();
    journey = null;

    if (isLoading.value) return;

    const tour = matchingTour(String(route.name ?? ''));
    if (!tour) return;

    const storageKey = tourStorageKey(tour);
    if (!force && hasCompletedOnboarding(storageKey)) return;
    if (!force && !ALWAYS_SHOW_TOUR && startedKeys.has(storageKey)) return;

    await options.prepare?.();
    await nextTick();
    await waitForPaint();
    if (token !== startToken) return;
    if (matchingTour(String(route.name ?? '')) !== tour) return;

    const steps = tour.steps((key) => t(key)).filter(stepAllowed);
    const visibleSteps = startTour({
      steps,
      nextLabel: t('onboarding.actions.next'),
      prevLabel: t('onboarding.actions.prev'),
      doneLabel: t('onboarding.actions.done'),
      prepareStep,
      onComplete: () => {
        journey = null;
        startedKeys.add(storageKey);
        markOnboardingCompleted(storageKey);
      },
    });

    if (!visibleSteps?.length) return;
    journey = { homeRoutes: tour.routeNames, steps: visibleSteps };
    if (!ALWAYS_SHOW_TOUR) startedKeys.add(storageKey);
  }

  async function continueJourney(): Promise<void> {
    if (!journey) return;
    const routeName = String(route.name ?? '');
    const index = getActiveTourIndex();
    if (index == null) return;

    const next = journey.steps[index + 1];
    if (!next?.routeNames?.includes(routeName)) return;

    await nextTick();
    await waitForPaint();
    await waitForTourTarget(next.element);
    if (handoff || String(route.name ?? '') !== routeName) return;
    moveActiveTour(index + 1);
  }

  async function startFromRequest(): Promise<void> {
    handoff = true;
    try {
      const home = panelTours[0]?.routeNames[0];
      if (home && String(route.name ?? '') !== home) {
        await router.push({ name: home });
        await nextTick();
        await waitForPaint();
      }
      await maybeStart(true);
    } finally {
      handoff = false;
    }
  }

  watch(tourReplayNonce, (nonce) => {
    if (!nonce) return;
    void startFromRequest();
  });

  watch([() => route.name, isLoading], () => {
    if (handoff) return;
    if (journey?.steps.some((step) => step.routeNames?.includes(String(route.name ?? '')))) {
      void continueJourney();
      return;
    }
    void maybeStart();
  }, { immediate: true });

  onBeforeUnmount(() => {
    startToken += 1;
    journey = null;
    destroyActiveTour();
  });
}

function matchingTour(routeName: string): TourDefinition | undefined {
  return panelTours.find((tour) => tour.routeNames.includes(routeName));
}

function waitForPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

function waitForTourTarget(selector: string): Promise<void> {
  return new Promise((resolve) => {
    let frame = 0;
    const check = () => {
      if (firstVisibleTourTarget(selector) || frame >= TARGET_FRAMES) {
        resolve();
        return;
      }
      frame += 1;
      requestAnimationFrame(check);
    };
    check();
  });
}
