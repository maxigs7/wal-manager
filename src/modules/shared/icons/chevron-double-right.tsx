import { createIcon } from '@chakra-ui/react';

export const ChevronDoubleRightIcon = createIcon({
  displayName: 'ChevronDoubleRightIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="m6.46.5 6.14 6.15a.48.48 0 0 1 0 .7L6.46 13.5" />
      <path d="M1.25.5 7.4 6.65a.5.5 0 0 1 0 .7L1.25 13.5" />
    </g>
  ),
});
