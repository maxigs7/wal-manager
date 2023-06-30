import { createIcon } from '@chakra-ui/react';

export const HexagramIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'HexagramIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.5 3.5h13L7 13.5.5 3.5Z" />
      <path d="M.5 10.5h13L7 .5l-6.5 10Z" />
    </g>
  ),
});
