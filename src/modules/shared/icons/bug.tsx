import { createIcon } from '@chakra-ui/react';

export const BugIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BugIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM2.5 8h-2M.5 11.5a3.46 3.46 0 0 0 2.63-1.2" />
      <path d="M3.13 5.7A3.46 3.46 0 0 0 .5 4.5M11.5 8h2M13.5 11.5a3.46 3.46 0 0 1-2.63-1.2M10.87 5.7a3.46 3.46 0 0 1 2.63-1.2M8.24 3.67A2.5 2.5 0 0 0 9.5 1.5M4.5 1.5a2.5 2.5 0 0 0 1.26 2.17M2.61 7h8.78" />
    </g>
  ),
});
