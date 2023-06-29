import { createIcon } from '@chakra-ui/react';

export const SortDescIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'SortDescIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7.93.5H.5M7.93 3.29h-5.1M7.93 6.07H5.14M13.5 11 11 13.5 8.5 11M11 .5v13" />
    </g>
  ),
});
