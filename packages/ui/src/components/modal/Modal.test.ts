import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';
import TrModal from './Modal.vue';

function mountModal(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(TrModal, {
    props: { open: true, title: 'جزئیات', ...props },
    slots: { default: '<p>محتوا</p>', ...slots },
    attachTo: document.body,
  });
}

describe('TrModal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
  });

  it('does not render when closed', () => {
    const wrapper = mountModal({ open: false });
    expect(document.querySelector('.tr-modal')).toBeNull();
    wrapper.unmount();
  });

  it('renders title and body when open', () => {
    const wrapper = mountModal();
    expect(document.querySelector('.tr-modal__title')?.textContent).toBe('جزئیات');
    expect(document.querySelector('.tr-modal__body')?.textContent).toContain('محتوا');
    wrapper.unmount();
  });

  it('emits close from the header button', async () => {
    const wrapper = mountModal();
    await document.querySelector<HTMLButtonElement>('.tr-modal__close')?.click();
    expect(wrapper.emitted('close')).toHaveLength(1);
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it('closes on overlay click when allowed', async () => {
    const wrapper = mountModal();
    await document.querySelector<HTMLElement>('.tr-modal')?.click();
    expect(wrapper.emitted('close')).toHaveLength(1);
    wrapper.unmount();
  });

  it('does not close on overlay click when disabled', async () => {
    const wrapper = mountModal({ closeOnOutside: false });
    await document.querySelector<HTMLElement>('.tr-modal')?.click();
    expect(wrapper.emitted('close')).toBeUndefined();
    wrapper.unmount();
  });

  it('closes on Escape', async () => {
    const wrapper = mountModal();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(wrapper.emitted('close')).toHaveLength(1);
    wrapper.unmount();
  });

  it('applies an optional height on the dialog', () => {
    const wrapper = mountModal({ height: '32rem' });
    const dialog = document.querySelector<HTMLElement>('.tr-modal__dialog');
    expect(dialog?.classList.contains('tr-modal__dialog--height')).toBe(true);
    expect(dialog?.style.getPropertyValue('--tr-modal-height')).toBe('32rem');
    wrapper.unmount();
  });

  it('hides the header when showHeader is false', () => {
    const wrapper = mountModal({ showHeader: false });
    expect(document.querySelector('.tr-modal__header')).toBeNull();
    wrapper.unmount();
  });
});
