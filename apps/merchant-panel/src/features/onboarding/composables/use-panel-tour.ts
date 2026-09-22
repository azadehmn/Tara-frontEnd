import { nextTick, onBeforeUnmount, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAppLoading } from '@shared/lib';
import { ALWAYS_SHOW_TOUR } from '../config/data-source';
import { panelTours } from '../config/panel-tours';
import { hasCompletedOnboarding, markOnboardingCompleted } from '../lib/onboarding-storage';
import { destroyActiveTour, startTour } from '../lib/start-tour';
import { tourStorageKey, type TourDefinition } from '../model/tour';

export type UsePanelTourOptions = {
  prepare?: () => void | Promise<void>;
};

export function usePanelTour(options: UsePanelTourOptions = {}) {
  const route = useRoute();
  const { t } = useI18n();
  const { isLoading } = useAppLoading();
  const startedKeys = new Set<string>();
  let startToken = 0;

  async function maybeStart(): Promise<void> {
    const token = ++startToken;
    destroyActiveTour();

    if (isLoading.value) return;

    const tour = matchingTour(String(route.name ?? ''));
    if (!tour) return;

    const storageKey = tourStorageKey(tour);
    if (
      !ALWAYS_SHOW_TOUR &&
      (hasCompletedOnboarding(storageKey) || startedKeys.has(storageKey))
    ) {
      return;
    }

    await options.prepare?.();
    await nextTick();
    await waitForPaint();
    if (token !== startToken) return;
    if (matchingTour(String(route.name ?? '')) !== tour) return;

    const started = startTour({
      steps: tour.steps((key) => t(key)),
      nextLabel: t('onboarding.actions.next'),
      prevLabel: t('onboarding.actions.prev'),
      doneLabel: t('onboarding.actions.done'),
      onComplete: () => {
        if (!ALWAYS_SHOW_TOUR) markOnboardingCompleted(storageKey);
      },
    });

    if (started && !ALWAYS_SHOW_TOUR) startedKeys.add(storageKey);
  }

  watch([() => route.name, isLoading], () => {
    void maybeStart();
  }, { immediate: true });

  onBeforeUnmount(() => {
    startToken += 1;
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
