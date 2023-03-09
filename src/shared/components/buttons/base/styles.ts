import { ButtonVariant, Colors, Sizes } from '@/theme';

type Styles = {
  button: string;
  icon: string;
  withIcon: string;
  [ButtonVariant.OUTLINE]: string;
  [ButtonVariant.SOLID]: string;
} & {
  [key in Colors]: {
    [key in ButtonVariant]: string;
  };
} & {
  [key in Sizes]: {
    button: string;
    icon: string;
  };
};

export const styles: Styles = {
  button:
    'align-middle text-center rounded-lg font-sans font-bold uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
  icon: 'flex select-none items-center justify-center',
  withIcon: 'flex select-none items-center gap-3 justify-center',

  [Sizes.sm]: {
    button: 'py-2 px-4 text-xs',
    icon: 'h-8 max-h-[32px] w-8 max-w-[32px] text-xs leading-none',
  },
  [Sizes.md]: {
    button: 'py-3 px-6 text-xs',
    icon: 'h-10 max-h-[40px] w-10 max-w-[40px] text-lg leading-none',
  },
  [Sizes.lg]: {
    button: 'py-3.5 px-7 text-sm',
    icon: 'h-12 max-h-[48px] w-12 max-w-[48px] text-2xl leading-none',
  },
  [Sizes.xl]: {
    button: 'py-4 px-8 text-sm',
    icon: 'h-14 max-h-[56px] w-14 max-w-[56px] text-3xl leading-none',
  },
  [ButtonVariant.OUTLINE]: 'border hover:opacity-75 focus:ring active:opacity-[0.85]',
  [ButtonVariant.SOLID]:
    'shadow-md hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none',

  [Colors.BLACK]: {
    [ButtonVariant.GHOST]: 'text-black hover:bg-black/10 active:bg-black/30',
    [ButtonVariant.OUTLINE]: 'border-black text-black focus:ring-black',
    [ButtonVariant.SOLID]: 'bg-black text-white shadow-black/20 hover:shadow-black/40',
  },
  [Colors.RED]: {
    [ButtonVariant.GHOST]: 'text-red-500 hover:bg-red-500/10 active:bg-red-500/30',
    [ButtonVariant.OUTLINE]: 'border-red-500 text-red-500 focus:ring-red-200',
    [ButtonVariant.SOLID]: 'bg-red-500 text-white shadow-red-500/20 hover:shadow-red-500/40',
  },
  [Colors.PINK]: {
    [ButtonVariant.GHOST]: 'text-pink-500 hover:bg-pink-500/10 active:bg-pink-500/30',
    [ButtonVariant.OUTLINE]: 'border-pink-500 text-pink-500 focus:ring-pink-200',
    [ButtonVariant.SOLID]: 'bg-pink-500 text-white shadow-pink-500/20 hover:shadow-pink-500/40',
  },
  [Colors.PURPLE]: {
    [ButtonVariant.GHOST]: 'text-purple-500 hover:bg-purple-500/10 active:bg-purple-500/30',
    [ButtonVariant.OUTLINE]: 'border-purple-500 text-purple-500 focus:ring-purple-200',
    [ButtonVariant.SOLID]:
      'bg-purple-500 text-white shadow-purple-500/20 hover:shadow-purple-500/40',
  },
  [Colors.DEEP_PURPLE]: {
    [ButtonVariant.GHOST]:
      'text-deep-purple-500 hover:bg-deep-purple-500/10 active:bg-deep-purple-500/30',
    [ButtonVariant.OUTLINE]:
      'border-deep-purple-500 text-deep-purple-500 focus:ring-deep-purple-200',
    [ButtonVariant.SOLID]:
      'bg-deep-purple-500 text-white shadow-deep-purple-500/20 hover:shadow-deep-purple-500/40',
  },
  [Colors.INDIGO]: {
    [ButtonVariant.GHOST]: 'text-indigo-500 hover:bg-indigo-500/10 active:bg-indigo-500/30',
    [ButtonVariant.OUTLINE]: 'border-indigo-500 text-indigo-500 focus:ring-indigo-200',
    [ButtonVariant.SOLID]:
      'bg-indigo-500 text-white shadow-indigo-500/20 hover:shadow-indigo-500/40',
  },
  [Colors.BLUE]: {
    [ButtonVariant.GHOST]: 'text-blue-500 hover:bg-blue-500/10 active:bg-blue-500/30',
    [ButtonVariant.OUTLINE]: 'border-blue-500 text-blue-500 focus:ring-blue-200',
    [ButtonVariant.SOLID]: 'bg-blue-500 text-white shadow-blue-500/20 hover:shadow-blue-500/40',
  },
  [Colors.LIGHT_BLUE]: {
    [ButtonVariant.GHOST]:
      'text-light-blue-500 hover:bg-light-blue-500/10 active:bg-light-blue-500/30',
    [ButtonVariant.OUTLINE]: 'border-light-blue-500 text-light-blue-500 focus:ring-light-blue-200',
    [ButtonVariant.SOLID]:
      'bg-light-blue-500 text-white shadow-light-blue-500/20 hover:shadow-light-blue-500/40',
  },
  [Colors.CYAN]: {
    [ButtonVariant.GHOST]: 'text-cyan-500 hover:bg-cyan-500/10 active:bg-cyan-500/30',
    [ButtonVariant.OUTLINE]: 'border-cyan-500 text-cyan-500 focus:ring-cyan-200',
    [ButtonVariant.SOLID]: 'bg-cyan-500 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40',
  },
  [Colors.TEAL]: {
    [ButtonVariant.GHOST]: 'text-teal-500 hover:bg-teal-500/10 active:bg-teal-500/30',
    [ButtonVariant.OUTLINE]: 'border-teal-500 text-teal-500 focus:ring-teal-200',
    [ButtonVariant.SOLID]: 'bg-teal-500 text-white shadow-teal-500/20 hover:shadow-teal-500/40',
  },
  [Colors.GREEN]: {
    [ButtonVariant.GHOST]: 'text-green-500 hover:bg-green-500/10 active:bg-green-500/30',
    [ButtonVariant.OUTLINE]: 'border-green-500 text-green-500 focus:ring-green-200',
    [ButtonVariant.SOLID]: 'bg-green-500 text-white shadow-green-500/20 hover:shadow-green-500/40',
  },
  [Colors.LIGHT_GREEN]: {
    [ButtonVariant.GHOST]:
      'text-light-green-500 hover:bg-light-green-500/10 active:bg-light-green-500/30',
    [ButtonVariant.OUTLINE]:
      'border-light-green-500 text-light-green-500 focus:ring-light-green-200',
    [ButtonVariant.SOLID]:
      'bg-light-green-500 text-white shadow-light-green-500/20 hover:shadow-light-green-500/40',
  },
  [Colors.LIME]: {
    [ButtonVariant.GHOST]: 'text-lime-500 hover:bg-lime-500/10 active:bg-lime-500/30',
    [ButtonVariant.OUTLINE]: 'border-lime-500 text-lime-500 focus:ring-lime-200',
    [ButtonVariant.SOLID]: 'bg-lime-500 text-white shadow-lime-500/20 hover:shadow-lime-500/40',
  },
  [Colors.YELLOW]: {
    [ButtonVariant.GHOST]: 'text-yellow-500 hover:bg-yellow-500/10 active:bg-yellow-500/30',
    [ButtonVariant.OUTLINE]: 'border-yellow-500 text-yellow-500 focus:ring-yellow-200',
    [ButtonVariant.SOLID]:
      'bg-yellow-500 text-white shadow-yellow-500/20 hover:shadow-yellow-500/40',
  },
  [Colors.AMBER]: {
    [ButtonVariant.GHOST]: 'text-amber-500 hover:bg-amber-500/10 active:bg-amber-500/30',
    [ButtonVariant.OUTLINE]: 'border-amber-500 text-amber-500 focus:ring-amber-200',
    [ButtonVariant.SOLID]: 'bg-amber-500 text-white shadow-amber-500/20 hover:shadow-amber-500/40',
  },
  [Colors.ORANGE]: {
    [ButtonVariant.GHOST]: 'text-orange-500 hover:bg-orange-500/10 active:bg-orange-500/30',
    [ButtonVariant.OUTLINE]: 'border-orange-500 text-orange-500 focus:ring-orange-200',
    [ButtonVariant.SOLID]:
      'bg-orange-500 text-white shadow-orange-500/20 hover:shadow-orange-500/40',
  },
  [Colors.DEEP_ORANGE]: {
    [ButtonVariant.GHOST]:
      'text-deep-orange-500 hover:bg-deep-orange-500/10 active:bg-deep-orange-500/30',
    [ButtonVariant.OUTLINE]:
      'border-deep-orange-500 text-deep-orange-500 focus:ring-deep-orange-200',
    [ButtonVariant.SOLID]:
      'bg-deep-orange-500 text-white shadow-deep-orange-500/20 hover:shadow-deep-orange-500/40',
  },
  [Colors.BROWN]: {
    [ButtonVariant.GHOST]: 'text-brown-500 hover:bg-brown-500/10 active:bg-brown-500/30',
    [ButtonVariant.OUTLINE]: 'border-brown-500 text-brown-500 focus:ring-brown-200',
    [ButtonVariant.SOLID]: 'bg-brown-500 text-white shadow-brown-500/20 hover:shadow-brown-500/40',
  },
  [Colors.GRAY]: {
    [ButtonVariant.GHOST]: 'text-gray-500 hover:bg-gray-500/10 active:bg-gray-500/30',
    [ButtonVariant.OUTLINE]: 'border-gray-500 text-gray-500 focus:ring-gray-200',
    [ButtonVariant.SOLID]: 'bg-gray-500 text-white shadow-gray-500/20 hover:shadow-gray-500/40',
  },
  [Colors.BLUE_GRAY]: {
    [ButtonVariant.GHOST]:
      'text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30',
    [ButtonVariant.OUTLINE]: 'border-blue-gray-500 text-blue-gray-500 focus:ring-blue-gray-200',
    [ButtonVariant.SOLID]:
      'bg-blue-gray-500 text-white shadow-blue-gray-500/20 hover:shadow-blue-gray-500/40',
  },
};
