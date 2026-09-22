import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrSummary from './Summary.vue';

const items = [
  { id: 'period', title: 'بازه اجرا', value: '۱ تا ۱۰' },
  { id: 'budget', title: 'بودجه', value: '۸٬۰۰۰٬۰۰۰' },
];

describe('TrSummary', () => {
  it('renders title and value for each item', () => {
    const wrapper = mount(TrSummary, { props: { items } });
    const rows = wrapper.findAll('.tr-summary__row');

    expect(rows).toHaveLength(2);
    expect(rows[0]?.text()).toContain('بازه اجرا');
    expect(rows[0]?.text()).toContain('۱ تا ۱۰');
    expect(rows[0]?.element.firstElementChild?.classList.contains('tr-summary__value')).toBe(true);
    expect(rows[0]?.element.lastElementChild?.classList.contains('tr-summary__title')).toBe(true);
  });

  it('shows skeletons while loading', () => {
    const wrapper = mount(TrSummary, { props: { items, loading: true } });

    expect(wrapper.findAll('.tr-summary__skeleton')).toHaveLength(4);
    expect(wrapper.text()).not.toContain('بودجه');
  });

  it('uses a dashed divider by default and can switch to solid or none', () => {
    const dashed = mount(TrSummary, { props: { items } });
    expect(dashed.get('.tr-summary__rule--dashed').exists()).toBe(true);

    const solid = mount(TrSummary, { props: { items, divider: 'solid' } });
    expect(solid.get('.tr-summary__rule--solid').exists()).toBe(true);

    const none = mount(TrSummary, { props: { items, divider: 'none' } });
    expect(none.find('.tr-summary__rule').exists()).toBe(false);
  });

  it('renders a currency label next to amount values', () => {
    const wrapper = mount(TrSummary, {
      props: {
        items: [{ id: 'spent', title: 'هزینه‌شده', value: '۳٬۲۴۰٬۰۰۰', valueLabel: 'تومان' }],
      },
    });

    expect(wrapper.get('.tr-label').text()).toBe('تومان');
  });

  it('renders status instead of value when provided', () => {
    const wrapper = mount(TrSummary, {
      props: {
        items: [{ id: 'status', title: 'وضعیت', status: { type: 'positive', text: 'فعال' } }],
      },
    });

    expect(wrapper.get('.tr-status__text').text()).toBe('فعال');
  });
});
