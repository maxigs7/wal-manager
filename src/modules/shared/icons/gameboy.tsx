import { createIcon } from '@chakra-ui/react';

export const GameboyIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'GameboyIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 10.5a.5.5 0 1 0 1 0 .5.5 0 1 0-1 0" />
      <path d="M11.94 12.22a1 1 0 0 1-1 1H3.06a1 1 0 0 1-1-1V1.78a1 1 0 0 1 1-1h7.88a1 1 0 0 1 1 1v10.44Z" />
      <path d="M10.03 7.54H3.97V2.49h6.06v5.05ZM5.13 11.35v-1.7M4.28 10.5h1.7" />
    </g>
  ),
});
