import { createIcon } from '@chakra-ui/react';

export const MouseIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'MouseIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6.5a3.5 3.5 0 1 0-7 0V10a3.5 3.5 0 1 0 7 0V6.5ZM1 7h7" />
      <path d="M4.5 7V2.75A2.25 2.25 0 0 1 6.75.5v0A2.25 2.25 0 0 1 9 2.75V3a2 2 0 1 0 4 0V1.5" />
    </g>
  ),
});
