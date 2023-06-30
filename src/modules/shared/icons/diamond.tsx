import { createIcon } from '@chakra-ui/react';

export const DiamondIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'DiamondIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.64 1.54H3.36a1.07 1.07 0 0 0-.85.46L.7 4.52a1.05 1.05 0 0 0 .06 1.29l5.46 6.29a1 1 0 0 0 1.58 0l5.46-6.29a1.05 1.05 0 0 0 .06-1.29L11.49 2a1.07 1.07 0 0 0-.85-.46v0Z" />
      <path d="M6.48 1.53 4.04 5.31 7 12.46M7.55 1.53l2.43 3.78L7 12.46M.52 5.31h12.96" />
    </g>
  ),
});
