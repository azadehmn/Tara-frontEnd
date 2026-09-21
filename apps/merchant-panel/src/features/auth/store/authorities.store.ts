import { defineStore } from 'pinia';
import { ApiError } from '@shared/api/errors/api-error';
import { getUserId } from '@shared/auth/auth-storage';
import { getUserAuthorities } from '../api/login.api';
import type { UserAuthority, UserAuthoritiesResponse } from '../model/authority';

/** Not Valid Permission for example
  { key: '', ... }
  { key: 'x', disabled: true }
  { key: 'x', deactivated: true }*/
function isGranted(item: UserAuthority): boolean {
  return Boolean(item.key) && item.disabled !== true && item.deactivated !== true;
}

/** Error Normalize and type saftly error: ApiError | null*/
function toApiError(cause: unknown): ApiError {
  return cause instanceof ApiError ? cause : new ApiError(String(cause));
}

let inFlight: Promise<void> | null = null;
let fetchGeneration = 0;
let abortController: AbortController | null = null;

export const useAuthoritiesStore = defineStore('authorities', {
  state: () => ({
    items: [] as UserAuthoritiesResponse, // current uthority
    pending: false,
    loaded: false,
    error: null as ApiError | null,
  }),
  actions: {
    has(key: string): boolean {
      return this.items.some((item) => item.key === key && isGranted(item)); //authorities.has('org_balance_report')
    },
    hasAny(keys: string | readonly string[]): boolean {
      const list = typeof keys === 'string' ? [keys] : keys;
      return list.some((key) => this.has(key)); //permission: ['contractsMerchant','contractsGuarantor',]
    },
    setItems(items: UserAuthoritiesResponse): void {
      this.items = items;
      this.loaded = true;
      this.error = null;
    },
    reset(): void {
      fetchGeneration += 1; // Ignore results from requests started before the latest reset.
      abortController?.abort();
      abortController = null;
      inFlight = null;
      this.items = [];
      this.pending = false;
      this.loaded = false;
      this.error = null;
    },
    async fetch(): Promise<void> {
      if (this.loaded) return;
      if (inFlight) return inFlight;

      const userId = getUserId();
      if (!userId) {
        this.items = [];
        return;
      }

      const generation = fetchGeneration;
      abortController = new AbortController();
      const { signal } = abortController;

      this.pending = true;
      this.error = null;
      inFlight = (async () => {
        try {
          const items = await getUserAuthorities(userId, { signal });
          if (generation !== fetchGeneration) return;
          this.setItems(items);
        } catch (cause) {
          if (generation !== fetchGeneration) return;
          const error = toApiError(cause);
          if (error.status === 401) return;
          this.items = [];
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
