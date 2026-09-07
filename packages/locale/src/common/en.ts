import type { MessageTree } from '../types';

/** Shared English copy. Keys must stay in sync with `fa.ts`. */
export const commonEn: MessageTree = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    retry: 'Try again',
  },
  errors: {
    unexpected: 'Something went wrong. Please try again.',
    network: 'Could not reach the server',
    permission: 'You do not have access to this service',
  },
};
