import { createIcon } from '@chakra-ui/react';

export const ChevronRightIcon = createIcon({
  displayName: 'ChevronRightIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M3.85.5 10 6.65a.48.48 0 0 1 0 .7L3.85 13.5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
