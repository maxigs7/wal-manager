import { createIcon } from '@chakra-ui/react';

export const TagIcon = createIcon({
  displayName: 'TagIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13.28 9.39-3.89 3.89a.75.75 0 0 1-1.06 0L.61 5.56a.36.36 0 0 1-.11-.29l.59-3.83a.37.37 0 0 1 .35-.35L5.27.5a.36.36 0 0 1 .29.11l7.72 7.72a.75.75 0 0 1 0 1.06Z" />
      <circle cx="4.11" cy="4.11" r=".5" />
    </g>
  ),
});
