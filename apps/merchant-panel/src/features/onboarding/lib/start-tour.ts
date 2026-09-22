import { driver, type DriveStep } from 'driver.js';
import type { TourStep } from '../model/tour';
import { firstVisibleTourTarget, resolveTourSteps } from './resolve-tour-steps';

export type StartTourOptions = {
  steps: TourStep[];
  nextLabel: string;
  prevLabel: string;
  doneLabel: string;
  progressText?: string;
  onComplete?: () => void;
};

type ActiveTour = {
  destroy: () => void;
};

let activeTour: ActiveTour | null = null;
let completing = false;

export function destroyActiveTour(): void {
  if (!activeTour) return;
  const current = activeTour;
  activeTour = null;
  current.destroy();
}

export function startTour(options: StartTourOptions): boolean {
  destroyActiveTour();

  const visibleSteps = resolveTourSteps(options.steps);
  if (!visibleSteps.length) return false;

  completing = false;

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
    popoverClass: 'tara-tour-popover',
    nextBtnText: options.nextLabel,
    prevBtnText: options.prevLabel,
    doneBtnText: options.doneLabel,
    progressText: options.progressText ?? '{{current}} / {{total}}',
    steps: visibleSteps.map(toDriveStep),
    onDestroyed: () => {
      activeTour = null;
      if (completing) return;
      completing = true;
      options.onComplete?.();
    },
  });

  activeTour = tour;
  tour.drive();
  return true;
}

function toDriveStep(step: TourStep): DriveStep {
  return {
    element: () => firstVisibleTourTarget(step.element) as Element,
    popover: {
      title: step.title,
      description: step.intro,
      side: step.side ?? 'bottom',
      align: step.align ?? 'start',
    },
  };
}
