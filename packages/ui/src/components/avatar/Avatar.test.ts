import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrAvatar from './Avatar.vue';

describe('TrAvatar', () => {
  it('renders an image when src is set', () => {
    const wrapper = mount(TrAvatar, {
      props: { src: 'https://example.com/user.png', alt: 'کاربر تست' },
    });

    expect(wrapper.get('img').attributes('src')).toBe('https://example.com/user.png');
    expect(wrapper.get('img').attributes('alt')).toBe('کاربر تست');
  });

  it('renders the fallback icon when src is empty', () => {
    const wrapper = mount(TrAvatar, { props: { alt: 'کاربر تست' } });

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renders a slotted letter icon inside the avatar', () => {
    const wrapper = mount(TrAvatar, {
      props: { shape: 'square' },
      slots: { default: '<svg id="LetterOpen"></svg>' },
    });

    expect(wrapper.find('.tr-avatar__glyph #LetterOpen').exists()).toBe(true);
  });
});
