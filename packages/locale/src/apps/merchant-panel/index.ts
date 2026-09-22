import type { LocaleMessages } from '../../types';
import { mergeMessageTrees } from '../../merge-messages';
import { merchantPanelEn } from './en';
import { merchantPanelFa } from './fa';
import { merchantPanelFaqItemsEn } from './faq-items.en';
import { merchantPanelFaqItemsFa } from './faq-items.fa';

/** Merchant panel strings only. Shared actions/errors live in `src/common`. */
export const merchantPanelMessages: LocaleMessages = {
  fa: mergeMessageTrees(merchantPanelFa, merchantPanelFaqItemsFa),
  en: mergeMessageTrees(merchantPanelEn, merchantPanelFaqItemsEn),
};
