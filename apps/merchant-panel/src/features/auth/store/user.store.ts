import { defineStore } from 'pinia';
import { ApiError } from '@shared/api/errors/api-error';
import { getMe } from '../api/user.api';
import type { CurrentUser } from '../model/user';

function toApiError(cause: unknown): ApiError {
  return cause instanceof ApiError ? cause : new ApiError(String(cause));
}

let inFlight: Promise<void> | null = null;
let fetchGeneration = 0;
let abortController: AbortController | null = null;

export const useUserStore = defineStore('user', {
  state: () => ({
    me: null as CurrentUser | null,
    pending: false,
    loaded: false,
    error: null as ApiError | null,
  }),
  getters: {
    avatar: (state): string => {
      const value = state.me?.avatar;
      return typeof value === 'string' && value.trim() ? value.trim() : '';
    },
  },
  actions: {
    setMe(me: CurrentUser | null): void {
      this.me = me;
      this.loaded = me != null;
      this.error = null;
    },
    reset(): void {
      fetchGeneration += 1;
      abortController?.abort();
      abortController = null;
      inFlight = null;
      this.me = null;
      this.pending = false;
      this.loaded = false;
      this.error = null;
    },
    async fetch(): Promise<void> {
      if (this.loaded) return;
      if (inFlight) return inFlight;

      const generation = fetchGeneration;
      abortController = new AbortController();
      const { signal } = abortController;

      this.pending = true;
      this.error = null;
      inFlight = (async () => {
        try {
          const me = await getMe({ signal });
          if (generation !== fetchGeneration) return;
          this.setMe(me);
        } catch (cause) {
          if (generation !== fetchGeneration) return;
          const error = toApiError(cause);
          if (error.status === 401) return;
          this.me = null;
          this.error = error;
          this.loaded = false;
        } finally {
          if (generation === fetchGeneration) {
            this.pending = false;
            inFlight = null;
            abortController = null;
          }
        }
      })();

      return inFlight;
    },
  },
});
