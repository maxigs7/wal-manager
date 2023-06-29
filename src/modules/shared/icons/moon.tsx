import { createIcon } from '@chakra-ui/react';

export const MoonIcon = createIcon({
  displayName: 'MoonIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M8 7a7 7 0 0 1 3.44-6A6.58 6.58 0 0 0 9 .5a6.5 6.5 0 0 0 0 13 6.58 6.58 0 0 0 2.47-.5A7 7 0 0 1 8 7Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
