import type { Component } from 'vue';

export type TrAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TrAvatarShape = 'rounded' | 'square';

export const TrAvatarType = {
  ProfileFill: 'ProfileFill',
  Letter: 'Letter',
  LetterOpen: 'LetterOpen',
} as const;

export type TrAvatarType = (typeof TrAvatarType)[keyof typeof TrAvatarType];

export type TrAvatarProps = {
  src?: string;
  alt?: string;
  size?: TrAvatarSize;
  shape?: TrAvatarShape;
  type?: TrAvatarType;
  icon?: Component;
  classIcon?: string;
  iconClass?: string;
};
