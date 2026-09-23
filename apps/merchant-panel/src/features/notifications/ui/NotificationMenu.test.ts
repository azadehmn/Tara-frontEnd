import { createI18n } from 'vue-i18n';
import { createMemoryHistory, createRouter } from 'vue-router';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NotificationMenu from './NotificationMenu.vue';

const messages = {
  fa: {
    layout: {
      notifications: {
        open: 'اعلان‌ها',
        readAll: 'همه را خواندم',
        markRead: 'خوانده شد',
        tabs: {
          announcements: 'اطلاعیه‌ها',
          alerts: 'اعلانات',
        },
        empty: {
          title: 'اعلانی وجود ندارد',
          caption: 'هنوز اعلانی دریافت نکرده‌اید',
        },
      },
    },
  },
};

function mountMenu() {
  const i18n = createI18n({
    legacy: false,
    locale: 'fa',
    messages,
  });
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  });

  return mount(NotificationMenu, {
    global: { plugins: [i18n, router] },
  });
}

describe('NotificationMenu', () => {
  it('shows the unread count, announcement list, and empty alerts tab', async () => {
    const wrapper = mountMenu();
    const trigger = wrapper.get('button');

    expect(trigger.text()).toContain('2');

    await trigger.trigger('click');

    expect(wrapper.text()).toContain('اطلاعیه‌ها');
    expect(wrapper.text()).toContain('تأخیر در تسویه تراکنش‌های پرداخت‌یاری');
    expect(wrapper.find('.tr-tab__count').text()).toBe('2');

    const alerts = wrapper.findAll('[role="tab"]').find((tab) => tab.text().includes('اعلانات'));
    await alerts?.trigger('click');

    expect(wrapper.text()).toContain('اعلانی وجود ندارد');
    expect(wrapper.text()).toContain('هنوز اعلانی دریافت نکرده‌اید');
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('clears the count after marking every announcement read', async () => {
    const wrapper = mountMenu();
    await wrapper.get('button').trigger('click');
    await wrapper.get('.notification-panel__read-all').trigger('click');

    expect(wrapper.find('.notification-trigger__count').exists()).toBe(false);
    expect(wrapper.find('.tr-tab__count').exists()).toBe(false);
    expect(wrapper.find('.notification-panel__read-all').exists()).toBe(false);
  });
});
