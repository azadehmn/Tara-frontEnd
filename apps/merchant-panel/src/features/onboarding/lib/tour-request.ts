import { ref } from 'vue';

/** Bumped when the user asks to replay the panel tour from settings. */
export const tourReplayNonce = ref(0);

export function requestPanelTour(): void {
  tourReplayNonce.value += 1;
}
