import { createIcon } from '@chakra-ui/react';

export const CatIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CatIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.25a.25.25 0 0 1 0-.5M5 7.25a.25.25 0 0 0 0-.5M9 7.25a.25.25 0 0 1 0-.5M9 7.25a.25.25 0 0 0 0-.5M4.5 13.21a4 4 0 0 0 1.5.29h2a4 4 0 0 0 1.5-.29M2 7.5v-7l4.15 3.06M12 7.5v-7L7.86 3.56" />
      <path d="M4.02 4.5c.73-.61 1.8-1 2.98-1 1.19 0 2.25.39 2.98 1M.5 9.5H4M4 11.5 1 13M10 9.5h3.5M10 11.5l3 1.5M7.75 9.5h-1.5L7 10l.75-.5Z" />
    </g>
  ),
});
