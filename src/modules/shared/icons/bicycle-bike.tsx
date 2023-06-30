import { createIcon } from '@chakra-ui/react';

export const BicycleBikeIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BicycleBikeIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.5 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0v0ZM9 11.25a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0v0ZM7 10.5l-3-5" />
      <path d="m4.95 7.09-2.2 4.16L7 10.5l2.85-3.33M11.25 11.25 8.98 4.63h2.64M3 5.5h2.5" />
    </g>
  ),
});
