import { createIcon } from '@chakra-ui/react';

export const JusticeScaleIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'JusticeScaleIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 9.5 3 4 .5 9.5m5 0a2.5 2.5 0 0 1-5 0m5 0h-5M13.5 9.5 11 4 8.5 9.5m5 0a2.5 2.5 0 0 1-5 0m5 0h-5M1.5 4h11M7 4V2" />
    </g>
  ),
});
