import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrTab from './Tab.vue';

const items = [
  { value: 'announcements', label: 'اطلاعیه‌ها', icon: true, count: 23 },
  { value: 'alerts', label: 'اعلانات' },
];

describe('TrTab', () => {
  it('marks the active tab and shows the count on the icon', () => {
    const wrapper = mount(TrTab, {
      props: { items, modelValue: 'announcements', hasBorder: true },
      slots: {
        icon: '<svg class="tab-icon" />',
      },
    });

    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs[0]?.classes()).toContain('is-active');
    expect(tabs[0]?.attributes('aria-selected')).toBe('true');
    expect(tabs[0]?.text()).toContain('23');
    expect(wrapper.find('.tab-icon').exists()).toBe(true);
    expect(wrapper.find('.tr-tab--border').exists()).toBe(true);
  });

  it('emits the selected value', async () => {
    const wrapper = mount(TrTab, {
      props: { items, modelValue: 'announcements' },
    });

    await wrapper.findAll('[role="tab"]')[1]?.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['alerts']);
  });

  it('hides a zero count', () => {
    const wrapper = mount(TrTab, {
      props: {
        modelValue: 'announcements',
        items: [{ value: 'announcements', label: 'اطلاعیه‌ها', icon: true, count: 0 }],
      },
    });

    expect(wrapper.find('.tr-tab__count').exists()).toBe(false);
  });
});
