import { createIcon } from '@chakra-ui/react';

export const OctopusIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'OctopusIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 9.5c0 2-2.5 2.35-3.85 1-1.09-1.08-.83-2.27 0-3a4 4 0 1 0-5.3 0c.83.73 1.09 1.92 0 3C3 11.85.5 11.5.5 9.5" />
      <path d="M6.25 10.5c-.17 1-1.25 3-3.25 3-1 0-1.5-.5-1.5-.5M7.75 10.5c.17 1 1.25 3 3.25 3 1 0 1.5-.5 1.5-.5M5.25 5.5a.25.25 0 0 1 0-.5M5.25 5.5a.25.25 0 0 0 0-.5M8.75 5.5a.25.25 0 0 1 0-.5M8.75 5.5a.25.25 0 0 0 0-.5" />
    </g>
  ),
});
