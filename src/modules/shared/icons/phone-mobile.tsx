import { createIcon } from '@chakra-ui/react';

export const PhoneMobileIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PhoneMobileIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5.5h-7a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-11a1 1 0 0 0-1-1ZM6.5 11h1" />
    </g>
  ),
});
