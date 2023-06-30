import { createIcon } from '@chakra-ui/react';

export const PartyPopperIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PartyPopperIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11.85 13.2-6.68-2.49a1.25 1.25 0 0 1-.48-2.05l4.19-4.19a1.26 1.26 0 0 1 2.06.53l2.48 6.68a1.22 1.22 0 0 1-1.57 1.52v0ZM2.05 7.13a2.06 2.06 0 0 1 1.46-.21M4.33 4.28A2.1 2.1 0 0 1 4 2.83M6.63.72A4.72 4.72 0 0 0 6.76 4M1 3.78a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </g>
  ),
});
