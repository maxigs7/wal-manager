import { createIcon } from '@chakra-ui/react';

export const SunIcon = createIcon({
  displayName: 'SunIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="2.5" />
      <path d="M7 .5v2M2.4 2.4l1.42 1.42M.5 7h2M2.4 11.6l1.42-1.42M7 13.5v-2M11.6 11.6l-1.42-1.42M13.5 7h-2M11.6 2.4l-1.42 1.42" />
    </g>
  ),
});
