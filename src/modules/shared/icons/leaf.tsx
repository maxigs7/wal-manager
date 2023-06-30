import { createIcon } from '@chakra-ui/react';

export const LeafIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'LeafIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.51 5.4c2 2.8.47 6.03-.27 7.3a1.42 1.42 0 0 1-1 .65c-1.45.25-5.06.53-7-2.29-1.91-2.65-1.83-7.33-1.66-9.55A1.05 1.05 0 0 1 3 .57c2.15.62 6.63 2.17 8.51 4.82Z" />
      <path d="M4.77 4.46a52.2 52.2 0 0 1 6 8.72" />
    </g>
  ),
});
