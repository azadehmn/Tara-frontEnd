import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrEmptyState from './EmptyState.vue';

describe('TrEmptyState', () => {
  it('renders title and description', () => {
    const wrapper = mount(TrEmptyState, {
      props: { title: 'خالی', description: 'موردی یافت نشد' },
    });

    expect(wrapper.text()).toContain('خالی');
    expect(wrapper.text()).toContain('موردی یافت نشد');
  });

  it('loads the named vector', () => {
    const wrapper = mount(TrEmptyState, {
      props: { vector: 'EmptyPaper', title: 'خالی' },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('loads the Transactions vector', () => {
    const wrapper = mount(TrEmptyState, {
      props: { vector: 'Transactions', title: 'خالی' },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('falls back when vector is missing', () => {
    const wrapper = mount(TrEmptyState, {
      props: { vector: undefined, title: 'خالی' },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders the action slot', () => {
    const wrapper = mount(TrEmptyState, {
      props: { description: 'موردی یافت نشد' },
      slots: { action: '<button type="button">تلاش مجدد</button>' },
    });

    expect(wrapper.get('button').text()).toBe('تلاش مجدد');
  });
});
