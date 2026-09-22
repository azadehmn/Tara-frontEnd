import { beforeEach, describe, expect, it } from 'vitest';
import { hasCompletedOnboarding, markOnboardingCompleted } from './onboarding-storage';

describe('onboarding storage', () => {
  const key = 'tara:onboarding:dashboard:v1';

  beforeEach(() => {
    localStorage.clear();
  });

  it('treats a missing key as unseen', () => {
    expect(hasCompletedOnboarding(key)).toBe(false);
  });

  it('persists completion for a tour version', () => {
    markOnboardingCompleted(key);

    expect(localStorage.getItem(key)).toBe('1');
    expect(hasCompletedOnboarding(key)).toBe(true);
  });

  it('keeps other versions unseen', () => {
    markOnboardingCompleted(key);

    expect(hasCompletedOnboarding('tara:onboarding:dashboard:v2')).toBe(false);
  });
});
