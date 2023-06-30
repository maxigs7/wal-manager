import { createIcon } from '@chakra-ui/react';

export const PieChartIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PieChartIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 13.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" />
      <path d="M7 .5V7l4.6 4.6" />
    </g>
  ),
});
