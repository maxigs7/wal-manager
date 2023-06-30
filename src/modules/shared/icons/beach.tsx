import { createIcon } from '@chakra-ui/react';

export const BeachIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BeachIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 13.48H13a2 2 0 0 1-2-2 2 2 0 0 1-4 0 2 2 0 0 1-4 0 2 2 0 0 1-2 2H.5M10 9.48a5.49 5.49 0 0 0-8.48 0" />
      <path d="M6.5 7.53c.06-2.26.75-4.32 2.25-5.06M5.76.57a2.58 2.58 0 0 1 3 1.9" />
      <path d="M12.41 2.84a2.78 2.78 0 0 0-3.66-.37" />
      <path d="M5.08 3.54a3 3 0 0 1 3.67-1.07 2.55 2.55 0 0 1 1.89 3" />
    </g>
  ),
});
