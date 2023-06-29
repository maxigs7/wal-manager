import { createIcon } from '@chakra-ui/react';

export const BarsIcon = createIcon({
  displayName: 'BarsIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13.5 2H.5M13.5 7H.5M13.5 12H.5" />
    </g>
  ),
});
