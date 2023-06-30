import { createIcon } from '@chakra-ui/react';

export const GraduationCapIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'GraduationCapIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 1.37 6.5 2.81L7 7 .5 4.18 7 1.37Z" />
      <path d="M3.45 5.47v3.06S4.54 9.95 7 9.95c2.47 0 3.55-1.42 3.55-1.42V5.47M1.7 10.6V4.71M1.7 13a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
    </g>
  ),
});
