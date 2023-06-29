import { createIcon } from '@chakra-ui/react';

export const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 .5v13M.5 6.96h13" />
    </g>
  ),
});
