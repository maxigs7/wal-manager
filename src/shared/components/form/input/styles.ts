import { Colors } from '@/theme';

type ComponentStyle = {
  input: string;
  label: string;
};

type Styles = ComponentStyle & {
  error: ComponentStyle;
} & {
  [key in Colors]: ComponentStyle;
};

export const styles: Styles = {
  input:
    'peer h-full w-full border-x-0 border-t-0 border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:outline-0 focus:border-x-0 focus:border-t-0 disabled:border-0 disabled:bg-blue-gray-50 focus:shadow-none',
  label: `after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-x-0 after:border-t-0 after:border-b-2 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight  peer-focus:after:scale-x-100  peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`,
  error: {
    input: 'group-[.is-invalid]:border-red-500',
    label:
      'group-[.is-invalid]:text-red-500 group-[.is-invalid]:after:border-red-500 group-[.is-invalid]:peer-placeholder-shown:text-red-500',
  },
  [Colors.BLACK]: {
    input: 'focus-border-black',
    label: 'peer-focus:text-black peer-focus:after:border-black',
  },
  [Colors.RED]: {
    input: 'focus-border-red-500',
    label: 'peer-focus:text-red-500 peer-focus:after:border-red-500',
  },
  [Colors.PINK]: {
    input: 'focus-border-pink-500',
    label: 'peer-focus:text-pink-500 peer-focus:after:border-pink-500',
  },
  [Colors.PURPLE]: {
    input: 'focus-border-purple-500',
    label: 'peer-focus:text-purple-500 peer-focus:after:border-purple-500',
  },
  [Colors.DEEP_PURPLE]: {
    input: 'focus-border-deep-purple-500',
    label: 'peer-focus:text-deep-purple-500 peer-focus:after:border-deep-purple-500',
  },
  [Colors.INDIGO]: {
    input: 'focus-border-indigo-500',
    label: 'peer-focus:text-indigo-500 peer-focus:after:border-indigo-500',
  },
  [Colors.BLUE]: {
    input: 'focus-border-blue-500',
    label: 'peer-focus:text-blue-500 peer-focus:after:border-blue-500',
  },
  [Colors.LIGHT_BLUE]: {
    input: 'focus-border-light-blue-500',
    label: 'peer-focus:text-light-blue-500 peer-focus:after:border-light-blue-500',
  },
  [Colors.CYAN]: {
    input: 'focus-border-cyan-500',
    label: 'peer-focus:text-cyan-500 peer-focus:after:border-cyan-500',
  },
  [Colors.TEAL]: {
    input: 'focus-border-teal-500',
    label: 'peer-focus:text-teal-500 peer-focus:after:border-teal-500',
  },
  [Colors.GREEN]: {
    input: 'focus-border-green-500',
    label: 'peer-focus:text-green-500 peer-focus:after:border-green-500',
  },
  [Colors.LIGHT_GREEN]: {
    input: 'focus-border-light-green-500',
    label: 'peer-focus:text-light-green-500 peer-focus:after:border-light-green-500',
  },
  [Colors.LIME]: {
    input: 'focus-border-lime-500',
    label: 'peer-focus:text-lime-500 peer-focus:after:border-lime-500',
  },
  [Colors.YELLOW]: {
    input: 'focus-border-yellow-500',
    label: 'peer-focus:text-yellow-500 peer-focus:after:border-yellow-500',
  },
  [Colors.AMBER]: {
    input: 'focus-border-amber-500',
    label: 'peer-focus:text-amber-500 peer-focus:after:border-amber-500',
  },
  [Colors.ORANGE]: {
    input: 'focus-border-orange-500',
    label: 'peer-focus:text-orange-500 peer-focus:after:border-orange-500',
  },
  [Colors.DEEP_ORANGE]: {
    input: 'focus-border-deep-orange-500',
    label: 'peer-focus:text-deep-orange-500 peer-focus:after:border-deep-orange-500',
  },
  [Colors.BROWN]: {
    input: 'focus-border-brown-500',
    label: 'peer-focus:text-brown-500 peer-focus:after:border-brown-500',
  },
  [Colors.GRAY]: {
    input: 'focus-border-gray-500',
    label: 'peer-focus:text-gray-500 peer-focus:after:border-gray-500',
  },
  [Colors.BLUE_GRAY]: {
    input: 'focus-border-blue-gray-500',
    label: 'peer-focus:text-blue-gray-500 peer-focus:after:border-blue-gray-500',
  },
};
