import { createIcon } from '@chakra-ui/react';

export const AirportPlaneIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'AirportPlaneIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M3.33 10.67H1.88a1.45 1.45 0 0 1 0-2.89h2.3L5.66 6.3 1.6 3.8a1.45 1.45 0 0 1-.52-1.91 1.47 1.47 0 0 1 2-.77l5.3 2.45L10.94.98a1.47 1.47 0 1 1 2.08 2.08l-2.59 2.56 2.45 5.35a1.46 1.46 0 0 1-.77 1.95 1.45 1.45 0 0 1-1.91-.52L7.7 8.34 6.22 9.82v2.3a1.45 1.45 0 0 1-2.89 0v-1.45Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
