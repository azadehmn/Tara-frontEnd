import type { LocaleMessages } from '../../types';
import { merchantPanelEn } from './en';
import { merchantPanelFa } from './fa';

/** Merchant panel strings only. Shared actions/errors live in `src/common`. */
export const merchantPanelMessages: LocaleMessages = {
  fa: merchantPanelFa,
  en: merchantPanelEn,
};
