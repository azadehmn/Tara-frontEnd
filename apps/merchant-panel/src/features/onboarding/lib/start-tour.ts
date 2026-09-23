import { driver, type Driver, type DriveStep } from 'driver.js';
import type { TourStep } from '../model/tour';
import { firstVisibleTourTarget, resolveTourSteps } from './resolve-tour-steps';

export type StartTourOptions = {
  steps: TourStep[];
  nextLabel: string;
  prevLabel: string;
  doneLabel: string;
  progressText?: string;
  /** Run before the tour shows this step. Used to change routes. */
  prepareStep?: (step: TourStep) => void | Promise<void>;
  onComplete?: () => void;
};

type ActiveTour = Driver;

let activeTour: ActiveTour | null = null;
let completing = false;

export function destroyActiveTour(): void {
  if (!activeTour) return;
  const current = activeTour;
  activeTour = null;
  current.destroy();
}

export function getActiveTourIndex(): number | undefined {
  if (!activeTour?.isActive()) return;
  return activeTour.getActiveIndex();
}

export function moveActiveTour(index: number): void {
  if (!activeTour?.isActive()) return;
  if (activeTour.getActiveIndex() === index) return;
  activeTour.moveTo(index);
}

export function startTour(options: StartTourOptions): TourStep[] | null {
  destroyActiveTour();

  const visibleSteps = resolveTourSteps(options.steps);
  if (!visibleSteps.length) return null;

  completing = false;
  let advancing = false;

  const tour = driver({
    overlayColor: '#101828',
    overlayOpacity: 0.55,
    stagePadding: 8,
    stageRadius: 12,
    popoverOffset: 12,
    showProgress: true,
    allowClose: true,
    animate: true,
    skipMissingElement: true,
    waitForElement: 1500,
    smoothScroll: true,
    disableActiveInteraction: false,
    popoverClass: 'tara-tour-popover',
    nextBtnText: options.nextLabel,
    prevBtnText: options.prevLabel,
    doneBtnText: options.doneLabel,
    progressText: options.progressText ?? '{{current}} / {{total}}',
    steps: visibleSteps.map(toDriveStep),
    onNextClick: (_element, _step, hook) => {
      void advance(hook.driver, 'next');
    },
    onPrevClick: (_element, _step, hook) => {
      void advance(hook.driver, 'prev');
    },
    onDestroyed: () => {
      if (activeTour === tour) activeTour = null;
    },
  });

  async function advance(current: Driver, direction: 'next' | 'prev'): Promise<void> {
    if (advancing || current !== tour) return;
    const index = current.getActiveIndex();
    if (index == null) return;

    const targetIndex = direction === 'next' ? index + 1 : index - 1;
    const target = visibleSteps[targetIndex];
    advancing = true;
    try {
      if (target) await options.prepareStep?.(target);
      if (!activeTour) return;
      if (target) {
        if (direction === 'next') current.moveNext();
        else current.movePrevious();
        return;
      }
      if (!completing) {
        completing = true;
        options.onComplete?.();
      }
      current.destroy();
    } finally {
      advancing = false;
    }
  }

  activeTour = tour;
  tour.drive();
  return visibleSteps;
}

function toDriveStep(step: TourStep): DriveStep {
  return {
    element: () => firstVisibleTourTarget(step.element) as Element,
    advanceOnClick: step.advanceOnClick,
    disableActiveInteraction: false,
    popover: {
      title: step.title,
      description: step.intro,
      side: step.side ?? 'bottom',
      align: step.align ?? 'start',
      showButtons: step.doneOnly ? ['next'] : undefined,
    },
  };
}
