import { createIcon } from '@chakra-ui/react';

export const LipstickIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'LipstickIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.29 9.71a1 1 0 0 0 0 1.41l2.09 2.09a1 1 0 0 0 1.41 0L8.5 9.5 5 6 1.29 9.71Z" />
      <path d="M5.54 6.54 11.29.79a1 1 0 0 1 1.09-.21 1 1 0 0 1 .62.92v2.17a1 1 0 0 1-.29.71L8 9M8.04 4.04l2.5 2.5" />
    </g>
  ),
});
