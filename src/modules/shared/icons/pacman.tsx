import { createIcon } from '@chakra-ui/react';

export const PacmanIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PacmanIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.21 3.79 7 7l5.21 3.21a6.13 6.13 0 1 1 0-6.42Z" />
      <path d="M5.5 4a.5.5 0 1 0 1 0 .5.5 0 1 0-1 0" />
    </g>
  ),
});
