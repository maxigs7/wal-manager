import { createIcon } from '@chakra-ui/react';

export const ArrowDownIcon = createIcon({
  displayName: 'ArrowDownIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 .5v13M10.5 10 7 13.5 3.5 10" />
    </g>
  ),
});
