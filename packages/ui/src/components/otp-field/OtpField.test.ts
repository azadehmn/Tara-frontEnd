import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrOtpField from './OtpField.vue';
import { sanitizeOtpValue } from './OtpField';

describe('sanitizeOtpValue', () => {
  it('keeps digits, converts Persian numerals, and clips length', () => {
    expect(sanitizeOtpValue('۱۲a۳۴۵۶۷', 6)).toBe('123456');
  });
});

describe('TrOtpField', () => {
  it('emits the joined code and complete when all cells are filled', async () => {
    const wrapper = mount(TrOtpField, {
      props: { modelValue: '', codeLength: 4 },
    });

    const inputs = wrapper.findAll('input');
    await inputs[0]!.setValue('1');
    await inputs[1]!.setValue('2');
    await inputs[2]!.setValue('3');
    await inputs[3]!.setValue('4');

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['1234']);
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['1234']);
  });

  it('fills cells from a paste and converts Persian digits', async () => {
    const wrapper = mount(TrOtpField, {
      props: { modelValue: '', codeLength: 6 },
    });

    await wrapper.get('input').trigger('paste', {
      clipboardData: { getData: () => '۱۲۳۴۵۶' },
    });

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['123456']);
    expect(wrapper.emitted('complete')?.at(-1)).toEqual(['123456']);
  });

  it('moves back and clears on Backspace', async () => {
    const wrapper = mount(TrOtpField, {
      props: { modelValue: '12', codeLength: 4 },
    });

    const inputs = wrapper.findAll('input');
    await inputs[1]!.trigger('keydown', { key: 'Backspace' });

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['1']);
  });
});
