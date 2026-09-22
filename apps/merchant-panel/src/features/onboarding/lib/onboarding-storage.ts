const COMPLETED_VALUE = '1'; //tara:onboarding:dashboard:v1 = 1

// Check if the user has already seen the tour
export function hasCompletedOnboarding(
  storageKey: string,
  storage: Storage = localStorage,
): boolean {
  try {
    return storage.getItem(storageKey) === COMPLETED_VALUE;
  } catch {
    return false;
  }
}

export function markOnboardingCompleted(storageKey: string, storage: Storage = localStorage): void {
  try {
    storage.setItem(storageKey, COMPLETED_VALUE);
  } catch {
    // Don't break the panel if storage is unavailable.
  }
}
