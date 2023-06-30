import { createIcon } from '@chakra-ui/react';

export const HeartsSymbolIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'HeartsSymbolIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M8.27 11.9a1.77 1.77 0 0 1-2.53 0L1.49 7.7C-1.35 4.86 2.36-1.42 7 3.22c4.64-4.63 8.34 1.65 5.51 4.48l-4.24 4.2Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
