<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue';
import type { Component } from 'vue';
import LetterIcon from '../../icons/LetterIcon.vue';
import LetterOpenIcon from '../../icons/LetterOpenIcon.vue';
import ProfileFillIcon from '../../icons/ProfileFillIcon.vue';
import type { TrAvatarProps, TrAvatarType } from './Avatar';

defineOptions({ name: 'TrAvatar' });

const props = withDefaults(defineProps<TrAvatarProps>(), {
  src: '',
  alt: '',
  size: 'md',
  shape: 'rounded',
  type: 'ProfileFill',
  classIcon: '',
  iconClass: '',
});

const slots = useSlots();

const AVATAR_ICONS: Record<TrAvatarType, Component> = {
  ProfileFill: ProfileFillIcon,
  Letter: LetterIcon,
  LetterOpen: LetterOpenIcon,
};

const failed = ref(false);

watch(
  () => props.src,
  () => {
    failed.value = false;
  },
);

const showImage = computed(() => Boolean(props.src) && !failed.value && !slots.default);
const typeIcon = computed(() => props.icon ?? AVATAR_ICONS[props.type]);
const iconClassName = computed(() => props.classIcon || props.iconClass);

function onImageError() {
  failed.value = true;
}
</script>

<template>
  <span
    class="tr-avatar"
    :class="[`tr-avatar--${size}`, `tr-avatar--${shape}`]"
    :role="showImage || !alt ? undefined : 'img'"
    :aria-label="showImage ? undefined : alt || undefined"
    :aria-hidden="showImage || alt ? undefined : true"
  >
    <img
      v-if="showImage"
      class="tr-avatar__image"
      :src="src"
      :alt="alt"
      @error="onImageError"
    />
    <span v-else class="tr-avatar__glyph" :class="iconClassName">
      <slot>
        <component :is="typeIcon" />
      </slot>
    </span>
  </span>
</template>

<style src="./styles.css"></style>
