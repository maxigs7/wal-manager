import { createIcon } from '@chakra-ui/react';

export const LocationPinIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'LocationPinIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.5 5c0 3-4.5 6.5-4.5 6.5S2.5 8 2.5 5C2.5 2.55 4.55.5 7 .5s4.5 2.05 4.5 4.5Z" />
      <path d="M7 6.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM11.08 10H12l1.5 3.5H.5L2 10h.92" />
    </g>
  ),
});
