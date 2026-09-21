import type { InjectionKey } from 'vue';

/** App-provided in-app back handler used by TrPageHeading when `@back` is omitted. */
export const TR_PAGE_BACK: InjectionKey<() => void | Promise<void>> = Symbol('trPageBack');
