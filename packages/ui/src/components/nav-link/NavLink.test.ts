import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrNavLink from './NavLink.vue';

describe('TrNavLink', () => {
  it('renders a button with label', () => {
    const wrapper = mount(TrNavLink, {
      props: { label: 'ویدیوهای آموزشی' },
    });

    expect(wrapper.get('button').text()).toContain('ویدیوهای آموزشی');
  });

  it('marks the active state', () => {
    const wrapper = mount(TrNavLink, {
      props: { label: 'فعال', active: true },
    });

    expect(wrapper.get('button').classes()).toContain('is-active');
  });

  it('renders an anchor when href is set', () => {
    const wrapper = mount(TrNavLink, {
      props: { label: 'تیکت', href: '/ticket' },
    });

    expect(wrapper.get('a').attributes('href')).toBe('/ticket');
  });

  it('renders the item count in parentheses', () => {
    const wrapper = mount(TrNavLink, {
      props: { label: 'سوالات پرتکرار', count: 16 },
    });

    expect(wrapper.get('button').text()).toContain('(16)');
  });
});
