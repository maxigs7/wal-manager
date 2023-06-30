import { createIcon } from '@chakra-ui/react';

export const RainbowIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'RainbowIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.5 10.25a6.5 6.5 0 1 1 13 0" />
      <path d="M3 10.25a4 4 0 0 1 8 0" />
      <path d="M5.5 10.25a1.5 1.5 0 0 1 3 0" />
    </g>
  ),
});
