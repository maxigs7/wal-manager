import { createIcon } from '@chakra-ui/react';

export const TrashIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'TrashIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3.5h12M2.5 3.5h9v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-9ZM4.5 3.5V3a2.5 2.5 0 1 1 5 0v.5M5.5 6.5v4M8.5 6.5v4" />
    </g>
  ),
});
