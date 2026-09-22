import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TrTextarea from './Textarea.vue';

describe('TrTextarea', () => {
  it('emits v-model on input', async () => {
    const wrapper = mount(TrTextarea, {
      props: { modelValue: '', placeholder: 'متن تیکت', name: 'ticket-body' },
    });

    await wrapper.get('textarea').setValue('سلام');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['سلام']);
  });

  it('associates the floating label with the textarea', async () => {
    const wrapper = mount(TrTextarea, {
      props: { placeholder: 'متن تیکت', name: 'ticket-body', modelValue: 'متن' },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.get('label').attributes('for')).toBe('ticket-body');
    expect(wrapper.get('textarea').attributes('id')).toBe('ticket-body');
  });
});
