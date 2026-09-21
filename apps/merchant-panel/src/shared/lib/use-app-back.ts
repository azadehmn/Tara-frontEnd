import type { App, Plugin } from 'vue';
import { inject } from 'vue';
import type { RouteLocationRaw, Router } from 'vue-router';
import { TR_PAGE_BACK } from '@tara/ui';

export const APP_BACK_FALLBACK: RouteLocationRaw = { name: 'dashboard' };

function isOnFallback(router: Router, fallback: RouteLocationRaw): boolean {
  return router.currentRoute.value.fullPath === router.resolve(fallback).fullPath;
}

function wasReplaced(router: Router): boolean {
  return Boolean(router.options.history.state.replaced);
}

function waitForNavigation(router: Router): Promise<void> {
  return new Promise((resolve) => {
    const stop = router.afterEach(() => {
      stop();
      resolve();
    });
  });
}

export function createAppBack(
  router: Router,
  fallback: RouteLocationRaw = APP_BACK_FALLBACK,
) {
  const stack: string[] = [];
  let popping = false;

  router.afterEach((to, from, failure) => {
    if (failure) return;

    if (popping) {
      popping = false;
      if (stack.length > 1) stack.pop();
      return;
    }

    if (wasReplaced(router)) {
      if (stack.length === 0) stack.push(to.fullPath);
      else stack[stack.length - 1] = to.fullPath;
      return;
    }

    if (!from.matched.length) {
      stack.length = 0;
      stack.push(to.fullPath);
      return;
    }

    const previous = stack[stack.length - 2];
    const hasForward = router.options.history.state.forward != null;
    if (hasForward && previous === to.fullPath) {
      stack.pop();
      return;
    }

    stack.push(to.fullPath);
  });

  function canGoBack(): boolean {
    return stack.length > 1;
  }

  async function goBack(): Promise<void> {
    if (canGoBack()) {
      popping = true;
      const done = waitForNavigation(router);
      router.back();
      await done;
      return;
    }
    if (isOnFallback(router, fallback)) return;
    await router.replace(fallback);
  }

  return { goBack, canGoBack };
}

/** Registers the in-app back handler for TrPageHeading and `useAppBack()`. */
export function installAppBack(router: Router): Plugin {
  const { goBack } = createAppBack(router, APP_BACK_FALLBACK);

  return {
    install(app: App) {
      app.provide(TR_PAGE_BACK, goBack);
    },
  };
}

/** Browser-like back: previous in-app route, or dashboard when this tab has no app history. */
export function useAppBack() {
  const goBack = inject(TR_PAGE_BACK);
  if (!goBack) {
    throw new Error('useAppBack() needs installAppBack() in main.ts');
  }
  return { goBack };
}
