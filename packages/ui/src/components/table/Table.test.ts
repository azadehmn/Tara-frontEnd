import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrTable from './Table.vue';

describe('TrTable empty state', () => {
  it('renders TrEmptyState when items is empty', () => {
    const wrapper = mount(TrTable, {
      props: {
        columns: [{ name: 'title', label: 'عنوان' }],
        items: [],
        title: 'موردی یافت نشد',
        vector: 'EmptyPaper',
        layout: 'table',
      },
    });

    expect(wrapper.find('.tr-empty-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('موردی یافت نشد');
  });

  it('passes vector to TrEmptyState', () => {
    const wrapper = mount(TrTable, {
      props: {
        columns: [{ name: 'title', label: 'عنوان' }],
        items: [],
        title: 'موردی یافت نشد',
        vector: 'Transactions',
        layout: 'table',
      },
    });

    expect(wrapper.findComponent({ name: 'TrEmptyState' }).props('vector')).toBe('Transactions');
  });

  it('renders TrEmptyState when items is missing', () => {
    const wrapper = mount(TrTable, {
      props: {
        columns: [{ name: 'title', label: 'عنوان' }],
        items: undefined,
        title: 'موردی یافت نشد',
        layout: 'table',
      },
    });

    expect(wrapper.find('.tr-empty-state').exists()).toBe(true);
  });
});
