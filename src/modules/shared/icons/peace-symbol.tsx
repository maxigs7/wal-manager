import { createIcon } from '@chakra-ui/react';

export const PeaceSymbolIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PeaceSymbolIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM7 .5v13" />
      <path d="M1.93 11.07 7 6l5.07 5.07" />
    </g>
  ),
});
