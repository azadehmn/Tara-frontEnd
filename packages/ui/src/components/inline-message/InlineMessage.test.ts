import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrInlineMessage from './InlineMessage.vue';

describe('TrInlineMessage', () => {
  it('renders title and description', () => {
    const wrapper = mount(TrInlineMessage, {
      props: { title: 'راهنما', description: 'توضیح صفحه' },
    });

    expect(wrapper.get('.tr-inline-message__title').text()).toBe('راهنما');
    expect(wrapper.get('.tr-inline-message__description').text()).toBe('توضیح صفحه');
  });

  it('uses alert role for warning and negative', () => {
    const warning = mount(TrInlineMessage, {
      props: { type: 'warning', description: 'هشدار' },
    });
    const negative = mount(TrInlineMessage, {
      props: { type: 'negative', description: 'خطا' },
    });
    const informative = mount(TrInlineMessage, {
      props: { type: 'informative', description: 'اطلاع' },
    });

    expect(warning.attributes('role')).toBe('alert');
    expect(negative.attributes('role')).toBe('alert');
    expect(informative.attributes('role')).toBe('status');
  });

  it('hides and emits dismiss when the close button is clicked', async () => {
    const wrapper = mount(TrInlineMessage, {
      props: { description: 'قابل بستن', dismissible: true },
    });

    await wrapper.get('.tr-inline-message__dismiss').trigger('click');

    expect(wrapper.emitted('dismiss')).toHaveLength(1);
    expect(wrapper.find('.tr-inline-message').exists()).toBe(false);
  });

  it('shows skeletons while loading', () => {
    const wrapper = mount(TrInlineMessage, {
      props: { title: 'عنوان', description: 'متن', loading: true },
    });

    expect(wrapper.find('.tr-inline-message__skeleton--title').exists()).toBe(true);
    expect(wrapper.find('.tr-inline-message__skeleton--description').exists()).toBe(true);
    expect(wrapper.find('.tr-inline-message__title').exists()).toBe(false);
  });

  it('renders the description slot', () => {
    const wrapper = mount(TrInlineMessage, {
      slots: { description: '<strong>محتوای سفارشی</strong>' },
    });

    expect(wrapper.get('.tr-inline-message__description').text()).toBe('محتوای سفارشی');
  });
});
