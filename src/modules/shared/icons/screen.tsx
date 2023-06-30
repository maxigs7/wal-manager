import { createIcon } from '@chakra-ui/react';

export const ScreenIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ScreenIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H1a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-8A.5.5 0 0 0 13 2ZM6 11l-1 2.5M8 11l1 2.5M4 13.5h6" />
    </g>
  ),
});
