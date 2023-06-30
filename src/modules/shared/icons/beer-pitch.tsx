import { createIcon } from '@chakra-ui/react';

export const BeerPitchIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BeerPitchIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 11h2a1 1 0 0 0 1-1V7.5a1 1 0 0 0-1-1h-1.84M2 6.88v4.62a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6.87" />
      <path d="M2 6.87a2.25 2.25 0 1 1 1.53-4.23 2.5 2.5 0 0 1 4.94 0A2.25 2.25 0 1 1 9.25 7H5v2a1.5 1.5 0 1 1-3 0V6.87Z" />
    </g>
  ),
});
