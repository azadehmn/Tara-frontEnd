import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrAccordion from './Accordion.vue';

describe('TrAccordion', () => {
  it('toggles content on header click', async () => {
    const wrapper = mount(TrAccordion, {
      props: { title: 'سوال', content: 'پاسخ' },
    });

    expect(wrapper.classes()).not.toContain('is-open');
    await wrapper.get('.tr-accordion__header').trigger('click');
    expect(wrapper.classes()).toContain('is-open');
    expect(wrapper.find('.tr-accordion__panel').attributes('style') ?? '').not.toContain(
      'display: none',
    );
  });

  it('emits update:open', async () => {
    const wrapper = mount(TrAccordion, {
      props: { title: 'سوال', content: 'پاسخ' },
    });

    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);
  });

  it('does not toggle when disabled', async () => {
    const wrapper = mount(TrAccordion, {
      props: { title: 'سوال', content: 'پاسخ', disabled: true },
    });

    await wrapper.get('button').trigger('click');
    expect(wrapper.find('.tr-accordion__panel').isVisible()).toBe(false);
  });
});
