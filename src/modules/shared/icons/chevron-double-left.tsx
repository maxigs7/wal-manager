import { createIcon } from '@chakra-ui/react';

export const ChevronDoubleLeftIcon = createIcon({
  displayName: 'ChevronDoubleLeftIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.54.5 1.4 6.65a.48.48 0 0 0 0 .7l6.14 6.15" />
      <path d="M12.75.5 6.6 6.65a.5.5 0 0 0 0 .7l6.15 6.15" />
    </g>
  ),
});
