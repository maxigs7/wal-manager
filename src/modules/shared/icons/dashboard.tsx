import { createIcon } from '@chakra-ui/react';

export const DashboardIcon = createIcon({
  displayName: 'DashboardIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7" cy="7" r="6.5" />
      <path d="m10 4.5-3 5M1 9.5h12" />
    </g>
  ),
});
