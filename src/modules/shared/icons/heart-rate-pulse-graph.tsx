import { createIcon } from '@chakra-ui/react';

export const HeartRatePulseGraphIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'HeartRatePulseGraphIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 12.41-5.43-5C-1.38 4.42 2.93-1.32 7 3.33c4.07-4.63 8.41 1.1 5.42 4.06l-5.42 5.01Z" />
      <path d="M3.52 6.75h1.53L6.08 4.8 7.64 8.4l1.34-1.66h1.5" />
    </g>
  ),
});
