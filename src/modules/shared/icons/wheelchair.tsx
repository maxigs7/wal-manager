import { createIcon } from '@chakra-ui/react';

export const WheelchairIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'WheelchairIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M4.2 6.51 3 .5H.5" />
      <path d="M7.46 10.5h4.5l.27.98-1.45-5.31a2 2 0 0 0-2-1.67h-5M11.08 8H6.87M12.5 13.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </g>
  ),
});
