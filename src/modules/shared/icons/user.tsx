import { createIcon } from '@chakra-ui/react';

export const UserIcon = createIcon({
  displayName: 'UserIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7" cy="3.75" r="3.25" />
      <path d="M13.18 13.5a6.49 6.49 0 0 0-12.36 0Z" />
    </g>
  ),
});
