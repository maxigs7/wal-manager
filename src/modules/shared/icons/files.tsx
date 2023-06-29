import { createIcon } from '@chakra-ui/react';

export const FilesIcon = createIcon({
  displayName: 'FilesIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <rect height="11" rx="1" width="8" x="2" y="2.5" />
      <path d="M4 5h4M4 7.5h4M4 10h2M4.5.5H11a1 1 0 0 1 1 1V11" />
    </g>
  ),
});
