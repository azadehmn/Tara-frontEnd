import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import TrPageHeading from './PageHeading.vue';
import { getScrollParent, scrollTopOf } from './PageHeading';
import { TR_PAGE_BACK } from './pageBack';

describe('getScrollParent', () => {
  it('falls back to window when no scrollable ancestor exists', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    expect(getScrollParent(el)).toBe(window);
    el.remove();
  });

  it('uses an overflow auto ancestor even when it is not overflowing yet', () => {
    const parent = document.createElement('div');
    parent.style.overflowY = 'auto';
    const el = document.createElement('div');
    parent.appendChild(el);
    document.body.appendChild(parent);
    expect(getScrollParent(el)).toBe(parent);
    parent.remove();
  });
});

describe('scrollTopOf', () => {
  it('reads an element scrollTop', () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollTop', { value: 24, configurable: true });
    expect(scrollTopOf(el)).toBe(24);
  });
});

describe('TrPageHeading', () => {
  it('renders title and description', () => {
    const wrapper = mount(TrPageHeading, {
      props: { title: 'تیکت‌ها', description: 'توضیحات صفحه' },
    });

    expect(wrapper.get('h1').text()).toBe('تیکت‌ها');
    expect(wrapper.get('p').text()).toBe('توضیحات صفحه');
  });

  it('emits back when the parent listens for it', async () => {
    const wrapper = mount(TrPageHeading, {
      props: { title: 'جزئیات', hasBack: true, backAriaLabel: 'بازگشت', onBack: () => undefined },
    });

    await wrapper.get('a').trigger('click');
    expect(wrapper.emitted('back')).toHaveLength(1);
  });

  it('uses the injected back handler when @back is omitted', async () => {
    const goBack = vi.fn();
    const wrapper = mount(TrPageHeading, {
      props: { title: 'جزئیات', hasBack: true },
      global: { provide: { [TR_PAGE_BACK as symbol]: goBack } },
    });

    await wrapper.get('a').trigger('click');
    expect(goBack).toHaveBeenCalledOnce();
    expect(wrapper.emitted('back')).toBeUndefined();
  });

  it('shows status and action slot', () => {
    const wrapper = mount(TrPageHeading, {
      props: {
        title: 'تیکت‌ها',
        status: { type: 'positive', text: 'فعال' },
      },
      slots: { action: '<button type="button">ثبت تیکت</button>' },
    });

    expect(wrapper.text()).toContain('فعال');
    expect(wrapper.text()).toContain('ثبت تیکت');
  });

  it('shows a title skeleton while loading', () => {
    const wrapper = mount(TrPageHeading, {
      props: { title: 'تیکت‌ها', loading: true },
    });

    expect(wrapper.find('h1').exists()).toBe(false);
    expect(wrapper.find('.tr-page-heading__skeleton--title').exists()).toBe(true);
  });
});
