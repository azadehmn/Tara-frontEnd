import { describe, expect, it } from 'vitest';
import { merchantPanelMessages } from './apps/merchant-panel';
import { commonMessages } from './common';
import { mergeLocaleMessages, mergeMessageTrees } from './merge-messages';

describe('mergeMessageTrees', () => {
  it('keeps common keys and appends the app tree', () => {
    const merged = mergeMessageTrees(commonMessages.fa, merchantPanelMessages.fa);

    expect(merged.common).toEqual(commonMessages.fa.common);
    expect(merged.errors).toEqual(commonMessages.fa.errors);
    expect(merged.app).toEqual(merchantPanelMessages.fa.app);
  });
});

describe('mergeLocaleMessages', () => {
  it('merges every locale from the shared and app dictionaries', () => {
    const merged = mergeLocaleMessages(commonMessages, merchantPanelMessages);

    expect(merged.fa.common).toEqual(commonMessages.fa.common);
    expect(merged.fa.app).toEqual(merchantPanelMessages.fa.app);
    expect(merged.en.common).toEqual(commonMessages.en.common);
    expect(merged.en.app).toEqual(merchantPanelMessages.en.app);
  });
});
