import React from 'react';

import { classnames } from '@/lib/classnames';
import { Colors, Sizes } from '@/theme';

type Props = {
  colorScheme?: Colors;
  inverse?: boolean;
  label?: string;
  size?: Sizes;
};

const styles = {
  fill: {
    [Colors.BLACK]: 'fill-black',
    [Colors.RED]: 'fill-red-500',
    [Colors.PINK]: 'fill-pink-500',
    [Colors.PURPLE]: 'fill-purple-500',
    [Colors.DEEP_PURPLE]: 'fill-deep-purple-500',
    [Colors.INDIGO]: 'fill-indigo-500',
    [Colors.BLUE]: 'fill-blue-500',
    [Colors.LIGHT_BLUE]: 'fill-light-blue-500',
    [Colors.CYAN]: 'fill-cyan-500',
    [Colors.TEAL]: 'fill-teal-500',
    [Colors.GREEN]: 'fill-green-500',
    [Colors.LIGHT_GREEN]: 'fill-light-green-500',
    [Colors.LIME]: 'fill-lime-500',
    [Colors.YELLOW]: 'fill-yellow-500',
    [Colors.AMBER]: 'fill-amber-500',
    [Colors.ORANGE]: 'fill-orange-500',
    [Colors.DEEP_ORANGE]: 'fill-deep-orange-500',
    [Colors.BROWN]: 'fill-brown-500',
    [Colors.GRAY]: 'fill-gray-500',
    [Colors.BLUE_GRAY]: 'fill-blue-gray-500',
  },
  color: {
    [Colors.BLACK]: 'text-black',
    [Colors.RED]: 'text-red-200',
    [Colors.PINK]: 'text-pink-200',
    [Colors.PURPLE]: 'text-purple-200',
    [Colors.DEEP_PURPLE]: 'text-deep-purple-200',
    [Colors.INDIGO]: 'text-indigo-200',
    [Colors.BLUE]: 'text-blue-200',
    [Colors.LIGHT_BLUE]: 'text-light-blue-200',
    [Colors.CYAN]: 'text-cyan-200',
    [Colors.TEAL]: 'text-teal-200',
    [Colors.GREEN]: 'text-green-200',
    [Colors.LIGHT_GREEN]: 'text-light-green-200',
    [Colors.LIME]: 'text-lime-200',
    [Colors.YELLOW]: 'text-yellow-200',
    [Colors.AMBER]: 'text-amber-200',
    [Colors.ORANGE]: 'text-orange-200',
    [Colors.DEEP_ORANGE]: 'text-deep-orange-200',
    [Colors.BROWN]: 'text-brown-200',
    [Colors.GRAY]: 'text-gray-200',
    [Colors.BLUE_GRAY]: 'text-blue-gray-200',
  },

  [Sizes.sm]: 'w-4 h-4',
  [Sizes.md]: 'w-6 h-6',
  [Sizes.lg]: 'w-8 h-8',
  [Sizes.xl]: 'w-10 h-10',
};

const Loader: React.FC<Props> = ({
  colorScheme = Colors.INDIGO,
  inverse = false,
  label = 'loading...',
  size = Sizes.xl,
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    role="status"
    viewBox="0 0 100 101"
    xmlns="http://www.w3.org/2000/svg"
    className={classnames(
      'mr-2 inline animate-spin',
      styles[size],
      !inverse && 'text-gray-200 dark:text-gray-600',
      !inverse && styles.fill[colorScheme],
      inverse && 'fill-gray-200 dark:fill-gray-600',
      inverse && styles.color[colorScheme],
    )}
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

export { Loader };
