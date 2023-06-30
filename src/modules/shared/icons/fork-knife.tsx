import { createIcon } from '@chakra-ui/react';

export const ForkKnifeIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ForkKnifeIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 13.5V.5c4 2 4.5 7.5 4.5 9.5H8.5M3.5.5v13M6 .5V3a2.5 2.5 0 0 1-2.5 2.5v0A2.5 2.5 0 0 1 1 3V.5" />
    </g>
  ),
});
