import { createIcon } from '@chakra-ui/react';

export const ArrowLeftIcon = createIcon({
  displayName: 'ArrowLeftIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13.5 7H.5M4 3.5.5 7 4 10.5" />
    </g>
  ),
});
