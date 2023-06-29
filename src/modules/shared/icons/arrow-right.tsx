import { createIcon } from '@chakra-ui/react';

export const ArrowRightIcon = createIcon({
  displayName: 'ArrowRightIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.5 7h13M10 10.5 13.5 7 10 3.5" />
    </g>
  ),
});
