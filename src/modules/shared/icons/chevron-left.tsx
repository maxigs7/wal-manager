import { createIcon } from '@chakra-ui/react';

export const ChevronLeftIcon = createIcon({
  displayName: 'ChevronLeftIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M10.15.5 4 6.65a.48.48 0 0 0 0 .7l6.15 6.15"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
