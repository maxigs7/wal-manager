import { createIcon } from '@chakra-ui/react';

export const StoreIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'StoreIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 8.5V13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8.5M8 8.5v5M1.5 10H8M.5 4 2 .5h10L13.5 4H.5ZM4.78 4v1a2 2 0 0 1-2 2H2.5a2 2 0 0 1-2-2V4" />
      <path d="M9.25 4v1a2 2 0 0 1-2 2h-.5a2 2 0 0 1-2-2V4M13.5 4v1a2 2 0 0 1-2 2h-.25a2 2 0 0 1-2-2V4" />
    </g>
  ),
});
