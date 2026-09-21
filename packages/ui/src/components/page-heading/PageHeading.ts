import type { TrStatusType } from '../status/Status';

export type TrPageHeadingStatus = {
  type: TrStatusType;
  text: string;
};

export type TrPageHeadingProps = {
  title?: string;
  description?: string;
  status?: TrPageHeadingStatus;
  loading?: boolean;
  /** Stick to the scroll container; compact after a short scroll. Default true. */
  sticky?: boolean;
  hasBack?: boolean;
  /** Accessible name for the default back button. */
  backAriaLabel?: string;
};

const SCROLLABLE = /(auto|scroll|overlay)/;

export function getScrollParent(el: HTMLElement | null): HTMLElement | Window {
  if (!el || typeof window === 'undefined') return window;

  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const { overflowY } = window.getComputedStyle(node);
    if (SCROLLABLE.test(overflowY) && node.scrollHeight > node.clientHeight) {
      return node;
    }
    node = node.parentElement;
  }

  return window;
}

export function scrollTopOf(node: HTMLElement | Window): number {
  if (node instanceof Window) return node.scrollY || node.pageYOffset || 0;
  return node.scrollTop;
}
