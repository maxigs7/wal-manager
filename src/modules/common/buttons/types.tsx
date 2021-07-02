import classnames from '@lib/classnames';

const ButtonSizesMap = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
};

const ButtonShapesMap = {
  circle: 'circle',
  rounded: 'rounded',
  square: 'square',
};

export type ButtonSizes = typeof ButtonSizesMap;
export type ButtonSizesType = keyof typeof ButtonSizesMap;
export type ButtonShapes = typeof ButtonShapesMap;
export type ButtonShapesType = keyof typeof ButtonShapesMap;

export const Shapes: ButtonShapes = {
  circle: 'rounded-full',
  rounded: 'rounded',
  square: '',
};

// prettier-ignore
export const Sizes: { [key in ButtonSizesType]: (rounded: boolean) => string } = {
  sm: (rounded: boolean) => classnames('text-sm', !rounded && 'px-6 py-1', rounded && 'p-2'),
  md: (rounded: boolean) => classnames(!rounded && 'px-6 py-2', rounded && 'p-3'),
  lg: (rounded: boolean) => classnames('text-lg', !rounded && 'px-6 py-3', rounded && 'p-4'),
};
