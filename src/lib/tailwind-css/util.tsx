import { ColorsMap } from './colors';

const TextSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl',
  'text-9xl',
];

export const containsTextSize = (classNames: string): boolean =>
  classNames.split(' ').some((value) => TextSizes.some((size) => size === value));

const textColors = Object.keys(ColorsMap);
export const containsTextColor = (classNames: string): boolean =>
  classNames
    .split(' ')
    .some((value) => textColors.some((color) => value.startsWith(`text-${color}`)));
