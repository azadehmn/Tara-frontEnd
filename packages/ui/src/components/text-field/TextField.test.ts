import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { describe, expect, it } from 'vitest';
import TrTextField from './TextField.vue';
import {
  amountInWords,
  formatAmount,
  sanitizeTextFieldValue,
  toEnNumber,
  toPersianWords,
} from './TextField';

describe('TrTextField helpers', () => {
  it('normalizes Persian and Arabic digits', () => {
    expect(toEnNumber('۱۲۳٤٥')).toBe('12345');
    expect(sanitizeTextFieldValue('۱۲a۳', { isNumber: true })).toBe('123');
  });

  it('formats large amounts without losing precision', () => {
    expect(formatAmount('123456789012345678901234')).toBe(
      '123,456,789,012,345,678,901,234',
    );
  });

  it('converts integer strings to Persian words without Number coercion', () => {
    expect(toPersianWords('1500000')).toBe('یک میلیون و پانصد هزار');
    expect(amountInWords('1,500,000')).toBe('یک میلیون و پانصد هزار');
  });
});

describe('TrTextField', () => {
  it('associates an accessible label and preserves native attributes', () => {
    const wrapper = mount(TrTextField, {
      props: {
        modelValue: '',
        labelText: 'ایمیل',
        placeholder: 'name@example.com',
      },
      attrs: {
        type: 'email',
        inputmode: 'email',
        autocomplete: 'email',
        readonly: '',
      },
    });

    const input = wrapper.get('input');
    const label = wrapper.get('label');

    expect(label.attributes('for')).toBe(input.attributes('id'));
    expect(input.attributes('type')).toBe('email');
    expect(input.attributes('inputmode')).toBe('email');
    expect(input.attributes('autocomplete')).toBe('email');
    expect(input.attributes()).toHaveProperty('readonly');
  });

  it('sanitizes numeric input before emitting v-model', async () => {
    const wrapper = mount(TrTextField, {
      props: {
        modelValue: '',
        isNumber: true,
        maxLength: 3,
      },
    });

    await wrapper.get('input').setValue('۱۲a۳۴');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['123']);
    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('123');
  });

  it('gives an icon action an accessible name and emits action', async () => {
    const Icon = defineComponent({
      render: () => h('svg', { 'aria-hidden': 'true' }),
    });
    const wrapper = mount(TrTextField, {
      props: {
        modelValue: '',
        afterIcon: Icon,
        actionAriaLabel: 'پاک کردن',
      },
    });

    const action = wrapper.get('button');
    expect(action.attributes('aria-label')).toBe('پاک کردن');

    await action.trigger('click');
    expect(wrapper.emitted('action')).toHaveLength(1);
  });

  it('floats the label above the border on focus with a surface background', async () => {
    const wrapper = mount(TrTextField, {
      props: {
        modelValue: '',
        placeholder: 'نام کاربری',
      },
    });

    expect(wrapper.find('.tr-text-field__label').exists()).toBe(false);

    await wrapper.get('input').trigger('focus');

    const label = wrapper.get('.tr-text-field__label');
    expect(label.text()).toBe('نام کاربری');
    expect(label.element.closest('.tr-text-field__control')).toBeNull();
  });

  it('uses current/max order for the character counter', () => {
    const wrapper = mount(TrTextField, {
      props: {
        modelValue: 'تارا',
        maxLength: 12,
      },
    });

    expect(wrapper.get('.tr-text-field__limit').text()).toBe('4/12');
  });
});
