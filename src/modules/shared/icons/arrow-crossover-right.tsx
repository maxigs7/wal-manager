import { createIcon } from '@chakra-ui/react';

export const ArrowCrossoverRightIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ArrowCrossoverRightIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m.5 13.5 13-13M9.5.5h4v4M9 9l4.5 4.5M9.5 13.5h4v-4M5 5 .5.5" />
    </g>
  ),
});
