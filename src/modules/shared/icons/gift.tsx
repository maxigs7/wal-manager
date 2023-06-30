import { createIcon } from '@chakra-ui/react';

export const GiftIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'GiftIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 3h-11a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM12.5 7v5.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V7M7 3v10.5M10 .5 7 3 4 .5" />
    </g>
  ),
});
