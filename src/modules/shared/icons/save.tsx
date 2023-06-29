import { createIcon } from '@chakra-ui/react';

export const SaveIcon = createIcon({
  displayName: 'SaveIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13.5 12.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-9l3-3h9a1 1 0 0 1 1 1Z" />
      <path d="M3.5 8.5h7v5h-7zM4.5.5h6v4h-6z" />
    </g>
  ),
});
