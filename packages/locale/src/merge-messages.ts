import type { LocaleMessages, MessageTree, SupportedLocale } from './types';
import { supportedLocales } from './types';

function isTree(value: string | MessageTree): value is MessageTree {
  return typeof value === 'object' && value !== null;
}

/**
 * Deep-merge two message trees.
 * App strings override common strings at the same key; unrelated common keys are kept.
 */
export function mergeMessageTrees(base: MessageTree, override: MessageTree): MessageTree {
  const result: MessageTree = { ...base };

  for (const [key, value] of Object.entries(override)) {
    const existing = result[key];
    if (isTree(value) && existing && isTree(existing)) {
      result[key] = mergeMessageTrees(existing, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

/** Merge shared copy with one app's copy for every supported locale. */
export function mergeLocaleMessages(
  common: LocaleMessages,
  app: LocaleMessages,
): LocaleMessages {
  return supportedLocales.reduce((acc, locale: SupportedLocale) => {
    acc[locale] = mergeMessageTrees(common[locale], app[locale]);
    return acc;
  }, {} as LocaleMessages);
}
