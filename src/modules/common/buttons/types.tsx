import classnames from '@lib/classnames';
import { Colors } from '@lib/tailwind-css/colors';

export enum ButtonShapes {
  CIRCLE = 'CIRCLE',
  ROUNDED = 'ROUNDED',
  SQUARE = 'NOROUNDED',
}

export enum ButtonSizes {
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

// prettier-ignore
export const ButtonColors: Colors = {
  amber:        'bg-amber-500 text-white active:bg-amber-600',
  black:        'bg-black text-white active:bg-gray-300',
  blue:         'bg-blue-500 text-white active:bg-blue-600',
  bluegray:     'bg-blueGray-500 text-white active:bg-blueGray-600',
  cyan:         'bg-cyan-500 text-white active:bg-cyan-600',
  emerald:      'bg-emerald-500 text-white active:bg-emerald-600',
  fuchsia:      'bg-fuchsia-500 text-white active:bg-fuchsia-600',
  gray:         'bg-gray-500 text-white active:bg-gray-600',
  green:        'bg-green-500 text-white active:bg-green-600',
  indigo:       'bg-indigo-500 text-white active:bg-indigo-600',
  lightblue:    'bg-lightBlue-500 text-white active:bg-lightBlue-600',
  lime:         'bg-lime-500 text-white active:bg-lime-600',
  orange:       'bg-orange-500 text-white active:bg-orange-600',
  pink:         'bg-pink-500 text-white active:bg-pink-600',
  primary:      'bg-primary-600 text-white active:bg-primary-700',
  purple:       'bg-purple-500 text-white active:bg-purple-600',
  red:          'bg-red-500 text-white active:bg-red-600',
  rose:         'bg-rose-500 text-white active:bg-rose-600',
  teal:         'bg-teal-500 text-white active:bg-teal-600',
  transparent:  'text-blueGray-600 ',
  violet:       'bg-violet-500 text-white active:bg-violet-600',
  yellow:       'bg-yellow-500 text-white active:bg-yellow-600',
  white:        'bg-white text-blueGray-600 active:bg-gray-300',
};

// prettier-ignore
export const ButtonOutlineColors: Colors = {
  amber:        'bg-transparent text-amber-500 border-amber-500 hover:text-white hover:bg-amber-500 active:border-amber-600 active:bg-amber-600',
  black:        'bg-transparent text-black border-black hover:text-white hover:bg-black active:bg-black',
  blue:         'bg-transparent text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500 active:border-blue-600 active:bg-blue-600',
  bluegray:     'bg-transparent text-blueGray-500 border-blueGray-500 hover:text-white hover:bg-blueGray-500 active:border-blueGray-600 active:bg-blueGray-600',
  cyan:         'bg-transparent text-cyan-500 border-cyan-500 hover:text-white hover:bg-cyan-500 active:border-cyan-600 active:bg-cyan-600',
  emerald:      'bg-transparent text-emerald-500 border-emerald-500 hover:text-white hover:bg-emerald-500 active:border-emerald-600 active:bg-emerald-600',
  fuchsia:      'bg-transparent text-fuchsia-500 border-fuchsia-500 hover:text-white hover:bg-fuchsia-500 active:border-fuchsia-600 active:bg-fuchsia-600',
  gray:         'bg-transparent text-gray-500 border-gray-500 hover:text-white hover:bg-gray-500 active:border-gray-600 active:bg-gray-600',
  green:        'bg-transparent text-green-500 border-green-500 hover:text-white hover:bg-green-500 active:border-green-600 active:bg-green-600',
  indigo:       'bg-transparent text-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-500 active:border-indigo-600 active:bg-indigo-600',
  lightblue:    'bg-transparent text-lightBlue-500 border-lightBlue-500 hover:text-white hover:bg-lightBlue-500 active:border-lightBlue-600 active:bg-lightBlue-600',
  lime:         'bg-transparent text-lime-500 border-lime-500 hover:text-white hover:bg-lime-500 active:border-lime-600 active:bg-lime-600',
  orange:       'bg-transparent text-orange-500 border-orange-500 hover:text-white hover:bg-orange-500 active:border-orange-600 active:bg-orange-600',
  pink:         'bg-transparent text-pink-500 border-pink-500 hover:text-white hover:bg-pink-500 active:border-pink-600 active:bg-pink-600',
  primary:      'bg-transparent text-primary-600 border-primary-600 hover:text-white hover:bg-primary-600 active:border-primary-700 active:bg-primary-700',
  purple:       'bg-transparent text-purple-500 border-purple-500 hover:text-white hover:bg-purple-500 active:border-purple-600 active:bg-purple-600',
  red:          'bg-transparent text-red-500 border-red-500 hover:text-white hover:bg-red-500 active:border-red-600 active:bg-red-600',
  rose:         'bg-transparent text-rose-500 border-rose-500 hover:text-white hover:bg-rose-500 active:border-rose-600 active:bg-rose-600',
  teal:         'bg-transparent text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 active:border-teal-600 active:bg-teal-600',
  transparent:  'text-blueGray-600 ',
  violet:       'bg-transparent text-violet-500 border-violet-500 hover:text-white hover:bg-violet-500 active:border-violet-600 active:bg-violet-600',
  yellow:       'bg-transparent text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500 active:border-yellow-600 active:bg-yellow-600',
  white:        '',
};

export const Shapes: { [key in ButtonShapes | string]: string } = {
  [ButtonShapes.CIRCLE]: 'rounded-full',
  [ButtonShapes.SQUARE]: '',
  [ButtonShapes.ROUNDED]: 'rounded',
};

// prettier-ignore
export const Sizes: { [key in ButtonSizes | string]: (rounded: boolean) => string } = {
  [ButtonSizes.SMALL]: (rounded: boolean) => classnames('text-sm', !rounded && 'px-6 py-1', rounded && 'p-2'),
  [ButtonSizes.REGULAR]: (rounded: boolean) => classnames(!rounded && 'px-6 py-2', rounded && 'p-3'),
  [ButtonSizes.LARGE]: (rounded: boolean) => classnames('text-lg', !rounded && 'px-6 py-3', rounded && 'p-4'),
};
