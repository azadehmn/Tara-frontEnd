<template>
  <div ref="rootRef" class="relative inline-flex" data-tour="profile">
    <button
      type="button"
      class="inline-flex cursor-pointer rounded-full border-none bg-transparent p-0"
      :aria-label="t('layout.userMenu.open')"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="toggleMenu"
    >
      <TrAvatar :src="avatarSrc" size="sm" shape="rounded" />
    </button>

    <Transition
      enter-active-class="origin-top-end transition duration-150 ease-out rtl:origin-top-left"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="origin-top-end transition duration-100 ease-in rtl:origin-top-left"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div v-if="open" class="absolute end-0 top-full z-[70] pt-sm" role="menu">
        <div
          class="relative w-[280px] rounded-lg bg-white px-md py-md text-start shadow-[0_8px_24px_rgba(80,63,205,0.08)] dark:bg-surface-dark"
        >
          <span
            class="absolute -top-2 end-3 size-4 rotate-45 bg-white dark:bg-surface-dark"
            aria-hidden="true"
          />

          <div class="relative flex justify-start">
            <TrAvatar :src="avatarSrc" size="md" shape="rounded" />
          </div>

          <div class="mt-sm min-w-0">
            <p class="truncate text-heading-sm text-[#1F2937] dark:text-text-dark">
              {{ displayName }}
            </p>
            <p class="mt-2xs truncate text-body-sm text-[#6B7280] dark:text-text-dark-soft">
              {{ displayMobile }}
            </p>
          </div>

          <div class="my-md h-px bg-[#E5E7EB] dark:bg-gray-800" />

          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-xs border-none bg-transparent py-xs text-start text-body-md text-[#1F2937] dark:text-text-dark"
            role="menuitem"
            @click="onSettings"
          >
            <TrIcon size="sm" class="shrink-0 text-[#6C44FF]">
              <TrSettingIcon />
            </TrIcon>
            {{ t('layout.userMenu.settings') }}
          </button>

          <button
            type="button"
            class="flex w-full cursor-pointer items-center gap-xs border-none bg-transparent py-xs text-start text-body-md text-[#1F2937] dark:text-text-dark"
            role="menuitem"
            @click="onLogout"
          >
            <span class="inline-flex size-5 shrink-0 text-[#6C44FF]" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M10 16.5 5.5 12 10 7.5M5.5 12H16"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            {{ t('layout.userMenu.logout') }}
          </button>
        </div>
      </div>
    </Transition>

    <AppearanceSettingsModal :open="settingsOpen" @close="settingsOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TrAvatar, TrIcon } from '@tara/ui';
import TrSettingIcon from '@tara/ui/icons/SettingIcon.vue';
import { AppearanceSettingsModal } from '@features/settings';
import { useUserStore } from '../store/user.store';
import { handleUnauthorized } from '@shared/auth/unauthorized';
import defaultAvatar from '@assets/images/default-avatar.png';
const { t } = useI18n();
const route = useRoute();
const userStore = useUserStore();

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);
const settingsOpen = ref(false);

const avatarSrc = computed(() => userStore.avatar || defaultAvatar);
const displayName = computed(() => userStore.me?.fullName?.trim() || userStore.me?.username || '');
const displayMobile = computed(() => userStore.me?.mobile?.trim() || '');

function closeMenu() {
  open.value = false;
}

function onSettings() {
  closeMenu();
  settingsOpen.value = true;
}

function toggleMenu(event: MouseEvent) {
  event.stopPropagation();
  open.value = !open.value;
}

function onDocumentPointer(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (rootRef.value?.contains(target)) return;
  closeMenu();
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  closeMenu();
}

function bindDocumentListeners() {
  document.addEventListener('click', onDocumentPointer);
  document.addEventListener('keydown', onEscape);
}

function unbindDocumentListeners() {
  document.removeEventListener('click', onDocumentPointer);
  document.removeEventListener('keydown', onEscape);
}

function onAffiliate() {
  closeMenu();
}

function onLogout() {
  closeMenu();
  handleUnauthorized();
}

watch(open, (isOpen) => {
  if (isOpen) bindDocumentListeners();
  else unbindDocumentListeners();
});

watch(
  () => route.fullPath,
  () => closeMenu(),
);

onBeforeUnmount(() => {
  unbindDocumentListeners();
});
</script>
