import { createIcon } from '@chakra-ui/react';

export const CloseIcon = createIcon({
  displayName: 'CloseIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="m13.5.5-13 13M.5.5l13 13" />
    </g>
  ),
});
