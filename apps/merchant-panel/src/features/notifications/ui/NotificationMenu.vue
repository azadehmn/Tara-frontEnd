<template>
  <div ref="rootRef" class="relative inline-flex">
    <button
      type="button"
      class="notification-trigger"
      :aria-label="t('layout.notifications.open')"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="toggle"
    >
      <TrIcon size="md">
        <NotificationChannelIcon />
      </TrIcon>
      <span v-if="unreadCount" class="notification-trigger__count">{{ unreadCount }}</span>
    </button>

    <Transition
      enter-active-class="origin-top-end transition duration-150 ease-out rtl:origin-top-start"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="origin-top-end transition duration-100 ease-in rtl:origin-top-start"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div v-if="open" class="notification-panel" role="dialog" :aria-label="t('layout.notifications.open')">
        <div class="notification-panel__header">
          <TrTab v-model="activeTab" :items="tabs" align="start" has-border>
            <template #icon>
              <TrIcon size="sm">
                <NotificationChannelIcon />
              </TrIcon>
            </template>
          </TrTab>
          <button
            v-if="activeTab === 'announcements' && unreadCount"
            type="button"
            class="notification-panel__read-all"
            @click="markAllRead"
          >
            <TrIcon size="sm">
              <DoubleTickIcon />
            </TrIcon>
            {{ t('layout.notifications.readAll') }}
          </button>
        </div>

        <div class="notification-panel__body">
          <div v-if="activeTab === 'announcements' && announcements.length" class="notification-list">
            <article
              v-for="item in announcements"
              :key="item.id"
              class="notification-list__item"
              :class="{ 'is-read': item.isRead }"
            >
              <div class="notification-list__icon">
                <TrIcon size="md">
                  <NotificationChannelIcon />
                </TrIcon>
                <span v-if="!item.isRead" class="notification-list__dot" />
              </div>
              <div class="notification-list__content">
                <h3 class="notification-list__title">{{ item.title }}</h3>
                <p class="notification-list__message">{{ item.message }}</p>
                <div class="notification-list__meta">
                  <button
                    v-if="!item.isRead"
                    type="button"
                    class="notification-list__read"
                    @click="markRead(item.id)"
                  >
                    {{ t('layout.notifications.markRead') }}
                  </button>
                  <span v-else class="notification-list__read is-done">
                    {{ t('layout.notifications.markRead') }}
                  </span>
                  <time class="notification-list__date">{{ item.date }}</time>
                </div>
              </div>
            </article>
          </div>
          <TrEmptyState
            v-else
            class="notification-panel__empty"
            :title="t('layout.notifications.empty.title')"
            :description="t('layout.notifications.empty.caption')"
            vector="EmptyNotification"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TrEmptyState, TrIcon, TrTab, type TrTabItem } from '@tara/ui';
import NotificationChannelIcon from '@tara/ui/icons/NotificationChannelIcon.vue';
import DoubleTickIcon from '@tara/ui/icons/DoubleTickIcon.vue';
import { announcementsMock } from '../config/announcements';
import type { Announcement } from '../model/announcement';

const { t } = useI18n();
const route = useRoute();

const rootRef = ref<HTMLElement | null>(null);
const open = ref(false);
const activeTab = ref('announcements');
const announcements = ref<Announcement[]>(announcementsMock.map((item) => ({ ...item })));

const unreadCount = computed(() => announcements.value.filter((item) => !item.isRead).length);

const tabs = computed<TrTabItem[]>(() => [
  {
    value: 'announcements',
    label: t('layout.notifications.tabs.announcements'),
    icon: true,
    count: unreadCount.value,
  },
  {
    value: 'alerts',
    label: t('layout.notifications.tabs.alerts'),
  },
]);

function toggle(event: MouseEvent) {
  event.stopPropagation();
  open.value = !open.value;
}

function markRead(id: string) {
  const item = announcements.value.find((entry) => entry.id === id);
  if (item) item.isRead = true;
}

function markAllRead() {
  announcements.value.forEach((item) => {
    item.isRead = true;
  });
}

function close() {
  open.value = false;
}

function onDocumentPointer(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (rootRef.value?.contains(target)) return;
  close();
}

function onEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  close();
}

function bindDocumentListeners() {
  document.addEventListener('click', onDocumentPointer);
  document.addEventListener('keydown', onEscape);
}

function unbindDocumentListeners() {
  document.removeEventListener('click', onDocumentPointer);
  document.removeEventListener('keydown', onEscape);
}

watch(open, (isOpen) => {
  if (isOpen) bindDocumentListeners();
  else unbindDocumentListeners();
});

watch(
  () => route.fullPath,
  () => close(),
);

onBeforeUnmount(() => {
  unbindDocumentListeners();
});
</script>

<style scoped>
.notification-trigger {
  position: relative;
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.notification-trigger:hover {
  background: var(--color-surface-hover);
}

.notification-trigger__count {
  position: absolute;
  top: -2px;
  inset-inline-end: -6px;
  display: inline-flex;
  min-width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-primary);
  padding: 0 4px;
  color: var(--color-text-onPrimary);
  font-size: 10px;
  line-height: 1;
}

.notification-panel {
  position: absolute;
  top: 100%;
  inset-inline-end: 0;
  z-index: 70;
  display: flex;
  width: min(420px, calc(100vw - 24px));
  max-height: min(640px, calc(100dvh - 80px));
  flex-direction: column;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: 0 8px 24px rgba(20, 35, 189, 0.12);
}

.notification-panel__header {
  position: relative;
  flex-shrink: 0;
  padding-inline: 8px;
}

.notification-panel__read-all {
  position: absolute;
  top: 50%;
  inset-inline-end: 12px;
  display: inline-flex;
  transform: translateY(-50%);
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: var(--color-primary);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.notification-panel__body {
  min-height: 0;
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 20px;
}

.notification-panel__empty {
  padding-block: 32px;
}

.notification-list__item {
  display: flex;
  gap: 8px;
  padding-block: 16px;
  border-bottom: 1px solid var(--color-border-divider);
}

.notification-list__item:last-child {
  border-bottom: 0;
}

.notification-list__item.is-read {
  opacity: 0.8;
}

.notification-list__icon {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;
  color: var(--color-text);
}

.notification-list__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--color-primary);
}

.notification-list__content {
  min-width: 0;
  flex: 1;
}

.notification-list__title {
  margin: 0;
  color: var(--color-text);
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
}

.notification-list__message {
  margin: 8px 0 0;
  color: var(--color-text-soft);
  font-size: 12px;
  line-height: 20px;
}

.notification-list__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}

.notification-list__read {
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--color-primary);
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.notification-list__read.is-done {
  cursor: default;
}

.notification-list__date {
  color: var(--color-text-soft);
  font-size: 12px;
}

:global(html[data-theme='dark']) .notification-trigger {
  color: var(--color-text-dark);
}

:global(html[data-theme='dark']) .notification-trigger:hover {
  background: var(--color-surface-dark-hover);
}

:global(html[data-theme='dark']) .notification-trigger__count {
  background: var(--color-primary-dark);
  color: var(--color-text-dark-onPrimary);
}

:global(html[data-theme='dark']) .notification-panel {
  background: var(--color-surface-dark);
  box-shadow: none;
  border: 1px solid var(--color-border-dark);
}

:global(html[data-theme='dark']) .notification-panel__read-all,
:global(html[data-theme='dark']) .notification-list__read {
  color: var(--color-primary-dark);
}

:global(html[data-theme='dark']) .notification-list__item {
  border-bottom-color: var(--color-border-dark-divider);
}

:global(html[data-theme='dark']) .notification-list__title,
:global(html[data-theme='dark']) .notification-list__icon {
  color: var(--color-text-dark);
}

:global(html[data-theme='dark']) .notification-list__message,
:global(html[data-theme='dark']) .notification-list__date {
  color: var(--color-text-dark-soft);
}
</style>
