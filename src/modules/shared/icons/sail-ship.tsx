import { createIcon } from '@chakra-ui/react';

export const SailShipIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'SailShipIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 9.5H.5l1 2.7a2 2 0 0 0 1.88 1.3h7.22a2 2 0 0 0 1.88-1.3l1.02-2.7ZM6.5 9.5v-9M6.5.5l-5 6h5M8.5 2.5l3.5 4H8.5" />
    </g>
  ),
});
