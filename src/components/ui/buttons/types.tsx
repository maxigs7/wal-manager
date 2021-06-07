export enum ButtonColors {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  GRAY = 'GRAY',
  BLUEGRAY = 'BLUEGRAY',
  ORANGE = 'ORANGE',
  AMBER = 'AMBER',
  EMERALD = 'EMERALD',
  TEAL = 'TEAL',
  LIGHTBLUE = 'LIGHTBLUE',
  PURPLE = 'PURPLE',
  PINK = 'PINK',
  INDIGO = 'INDIGO',
}

export enum ButtonSizes {
  SMALL = 'SMALL',
  REGULAR = 'REGULAR',
  LARGE = 'LARGE',
}

export const Colors: { [key in ButtonColors | string]: string } = {
  [ButtonColors.BLACK]: 'bg-black text-white active:bg-gray-300',
  [ButtonColors.WHITE]: 'bg-white text-blueGray-600 active:bg-gray-300',
  [ButtonColors.GRAY]: 'bg-gray-500 text-white active:bg-gray-600',
  [ButtonColors.BLUEGRAY]: 'bg-blueGray-500 text-white active:bg-blueGray-600',
  [ButtonColors.ORANGE]: 'bg-orange-500 text-white active:bg-orange-600',
  [ButtonColors.AMBER]: 'bg-amber-500 text-white active:bg-amber-600',
  [ButtonColors.EMERALD]: 'bg-emerald-500 text-white active:bg-emerald-600',
  [ButtonColors.TEAL]: 'bg-teal-500 text-white active:bg-teal-600',
  [ButtonColors.LIGHTBLUE]: 'bg-lightBlue-500 text-white active:bg-lightBlue-600',
  [ButtonColors.PURPLE]: 'bg-purple-500 text-white active:bg-purple-600',
  [ButtonColors.PINK]: 'bg-pink-500 text-white active:bg-pink-600',
  [ButtonColors.INDIGO]: 'bg-indigo-500 text-white active:bg-indigo-600',
};

export const OutlineColors: { [key in ButtonColors | string]: string } = {
  [ButtonColors.BLACK]:
    'bg-transparent text-black border-black hover:text-white hover:bg-black active:bg-black',
  [ButtonColors.WHITE]: '',
  [ButtonColors.GRAY]:
    'bg-transparent text-gray-500 border-gray-500 hover:text-white hover:bg-gray-500 active:border-gray-600 active:bg-gray-600',
  [ButtonColors.BLUEGRAY]:
    'bg-transparent text-blueGray-500 border-blueGray-500 hover:text-white hover:bg-blueGray-500 active:border-blueGray-600 active:bg-blueGray-600',
  [ButtonColors.ORANGE]:
    'bg-transparent text-orange-500 border-orange-500 hover:text-white hover:bg-orange-500 active:border-orange-600 active:bg-orange-600',
  [ButtonColors.AMBER]:
    'bg-transparent text-amber-500 border-amber-500 hover:text-white hover:bg-amber-500 active:border-amber-600 active:bg-amber-600',
  [ButtonColors.EMERALD]:
    'bg-transparent text-emerald-500 border-emerald-500 hover:text-white hover:bg-emerald-500 active:border-emerald-600 active:bg-emerald-600',
  [ButtonColors.TEAL]:
    'bg-transparent text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 active:border-teal-600 active:bg-teal-600',
  [ButtonColors.LIGHTBLUE]:
    'bg-transparent text-lightBlue-500 border-lightBlue-500 hover:text-white hover:bg-lightBlue-500 active:border-lightBlue-600 active:bg-lightBlue-600',
  [ButtonColors.PURPLE]:
    'bg-transparent text-purple-500 border-purple-500 hover:text-white hover:bg-purple-500 active:border-purple-600 active:bg-purple-600',
  [ButtonColors.PINK]:
    'bg-transparent text-pink-500 border-pink-500 hover:text-white hover:bg-pink-500 active:border-pink-600 active:bg-pink-600',
  [ButtonColors.INDIGO]:
    'bg-transparent text-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-500 active:border-indigo-600 active:bg-indigo-600',
};

export const Sizes: { [key in ButtonSizes | string]: string } = {
  [ButtonSizes.SMALL]: 'px-6 py-1 text-sm',
  [ButtonSizes.REGULAR]: 'px-6 py-2',
  [ButtonSizes.LARGE]: 'px-6 py-3 text-lg',
};
