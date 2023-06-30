import { createIcon } from '@chakra-ui/react';

export const BuildingIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BuildingIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 13.5h-8V4l4-3.5 4 3.5v9.5ZM8.5 13.5h5v-7h-5M4.5 13.5v-2M3 8.5h3M3 5.5h3" />
    </g>
  ),
});
