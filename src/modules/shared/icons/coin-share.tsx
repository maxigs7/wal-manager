import { createIcon } from '@chakra-ui/react';

export const CoinShareIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CoinShareIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 8.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM9.5 5.5v-2M.5 11l2.44 2.04a2 2 0 0 0 1.28.46h6.45c.46 0 .83-.37.83-.83 0-.92-.75-1.67-1.67-1.67H5.35" />
      <path d="m3.5 10 .75.75a1.06 1.06 0 0 0 1.5-1.5L4.59 8.09a2 2 0 0 0-1.42-.59H.5" />
    </g>
  ),
});
