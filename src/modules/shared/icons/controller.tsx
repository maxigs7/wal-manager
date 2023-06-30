import { createIcon } from '@chakra-ui/react';

export const ControllerIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ControllerIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.4 7v2.31M5.56 8.16H3.25M1.26 7.2l-.42 3.7a2.28 2.28 0 0 0 4.32 1.27l.36-.71h2.97l.36.71a2.28 2.28 0 0 0 4.3-1.27l-.4-3.7a3 3 0 0 0-2.99-2.68H4.24A3 3 0 0 0 1.26 7.2Z" />
      <path d="M7 4.52v-.98a1 1 0 0 1 1-1h1.47a1 1 0 0 0 1-1V.56M10.47 7.5a.25.25 0 0 1 0-.5M10.47 7.5a.25.25 0 1 0 0-.5M8.73 8.73a.25.25 0 0 1 .5 0M8.73 8.73a.25.25 0 0 0 .5 0" />
    </g>
  ),
});
