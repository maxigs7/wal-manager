import { createIcon } from '@chakra-ui/react';

export const StartupIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'StartupIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.71 4.31C3.79 3 2 4 .5 5.54l3.32 2M9.69 8.29C11 10.21 10 12 8.46 13.5l-2-3.32" />
      <path d="m3.82 7.53 2.65 2.65C8.59 8.91 11 7.68 12.1 6.54c2.38-2.38 1-5.64 1-5.64s-3.26-1.38-5.64 1C6.32 3 5.08 5.42 3.82 7.53ZM5.28 5.02l3.7 3.7" />
      <path d="M10.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3.68 12.44C3.1 13 .5 13.5.5 13.5s.5-2.6 1.06-3.18a1.5 1.5 0 0 1 2.6 1.05 1.5 1.5 0 0 1-.48 1.07v0Z" />
    </g>
  ),
});
