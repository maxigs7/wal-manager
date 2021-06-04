export interface ButtonColors {
  BLACK: string;
  WHITE: string;
  GRAY: string;
  BLUEGRAY: string;
  ORANGE: string;
  AMBER: string;
  EMERALD: string;
  TEAL: string;
  LIGHTBLUE: string;
  PURPLE: string;
  PINK: string;
  INDIGO: string;
}

export interface ButtonSizes {
  SMALL: string;
  REGULAR: string;
  LARGE: string;
}

export const Colors: ButtonColors = {
  BLACK: 'bg-black text-white active:bg-gray-300',
  WHITE: 'bg-white text-blueGray-600 active:bg-gray-300',
  GRAY: 'bg-gray-500 text-white active:bg-gray-600',
  BLUEGRAY: 'bg-blueGray-500 text-white active:bg-blueGray-600',
  ORANGE: 'bg-orange-500 text-white active:bg-orange-600',
  AMBER: 'bg-amber-500 text-white active:bg-amber-600',
  EMERALD: 'bg-emerald-500 text-white active:bg-emerald-600',
  TEAL: 'bg-teal-500 text-white active:bg-teal-600',
  LIGHTBLUE: 'bg-lightBlue-500 text-white active:bg-lightBlue-600',
  PURPLE: 'bg-purple-500 text-white active:bg-purple-600',
  PINK: 'bg-pink-500 text-white active:bg-pink-600',
  INDIGO: 'bg-indigo-500 text-white active:bg-indigo-600',
};

export const OutlineColors = {
  BLACK: 'bg-transparent text-black border-black hover:text-white hover:bg-black active:bg-black',
  WHITE: '',
  GRAY: 'bg-transparent text-gray-500 border-gray-500 hover:text-white hover:bg-gray-500 active:border-gray-600 active:bg-gray-600',
  BLUEGRAY:
    'bg-transparent text-blueGray-500 border-blueGray-500 hover:text-white hover:bg-blueGray-500 active:border-blueGray-600 active:bg-blueGray-600',
  ORANGE:
    'bg-transparent text-orange-500 border-orange-500 hover:text-white hover:bg-orange-500 active:border-orange-600 active:bg-orange-600',
  AMBER:
    'bg-transparent text-amber-500 border-amber-500 hover:text-white hover:bg-amber-500 active:border-amber-600 active:bg-amber-600',
  EMERALD:
    'bg-transparent text-emerald-500 border-emerald-500 hover:text-white hover:bg-emerald-500 active:border-emerald-600 active:bg-emerald-600',
  TEAL: 'bg-transparent text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500 active:border-teal-600 active:bg-teal-600',
  LIGHTBLUE:
    'bg-transparent text-lightBlue-500 border-lightBlue-500 hover:text-white hover:bg-lightBlue-500 active:border-lightBlue-600 active:bg-lightBlue-600',
  PURPLE:
    'bg-transparent text-purple-500 border-purple-500 hover:text-white hover:bg-purple-500 active:border-purple-600 active:bg-purple-600',
  PINK: 'bg-transparent text-pink-500 border-pink-500 hover:text-white hover:bg-pink-500 active:border-pink-600 active:bg-pink-600',
  INDIGO:
    'bg-transparent text-indigo-500 border-indigo-500 hover:text-white hover:bg-indigo-500 active:border-indigo-600 active:bg-indigo-600',
};

export const Sizes = {
  SMALL: 'px-6 py-1 text-sm',
  REGULAR: 'px-6 py-2',
  LARGE: 'px-6 py-3 text-lg',
};
