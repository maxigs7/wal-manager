import { createIcon } from '@chakra-ui/react';

export const ArrowUpIcon = createIcon({
  displayName: 'ArrowUpIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13.5V.5M10.5 4 7 .5 3.5 4" />
    </g>
  ),
});
