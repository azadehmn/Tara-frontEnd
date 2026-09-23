import { createI18n } from 'vue-i18n';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { summaryMock } from '../api/summary.mock';
import BalanceCard from './BalanceCard.vue';

const i18n = createI18n({
  legacy: false,
  locale: 'fa',
  messages: {
    fa: {
      common: { currency: { rial: 'ریال' } },
      summary: {
        sales: { daily: 'فروش دیروز' },
        balance: {
          title: 'موجودی و تراکنش',
          withdrawable: 'میزان فروش سال جاری',
          totalTransactions: 'تعداد تراکنش',
          transactionsAmount: 'مبلغ تراکنش',
          returned: 'تعداد تراکنش مرجوعی',
          returnedAmount: 'مبلغ تراکنش مرجوعی',
        },
      },
    },
  },
});

describe('BalanceCard', () => {
  it('shows current-year sales and the transaction rows', () => {
    const wrapper = mount(BalanceCard, {
      props: { summary: summaryMock.data },
      global: { plugins: [i18n] },
    });

    expect(wrapper.text()).toContain('میزان فروش سال جاری');
    expect(wrapper.text()).toContain('فروش دیروز');
    expect(wrapper.text()).toContain('تعداد تراکنش مرجوعی');
    expect(wrapper.text()).toContain('مبلغ تراکنش مرجوعی');
    expect(wrapper.text()).toContain('تعداد تراکنش');
    expect(wrapper.text()).toContain('مبلغ تراکنش');
    expect(wrapper.text()).not.toContain('موجودی قابل برداشت');
    expect(wrapper.text()).not.toContain('فروش امروز');
  });
});
