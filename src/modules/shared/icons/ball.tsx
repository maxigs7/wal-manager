import { createIcon } from '@chakra-ui/react';

export const BallIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BallIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM7 .5v13" />
      <path d="M2.1 11.27a5 5 0 0 0 0-8.54M11.9 2.73a5 5 0 0 0 0 8.54" />
    </g>
  ),
});
