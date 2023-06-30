import { createIcon } from '@chakra-ui/react';

export const CocktailIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CocktailIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.68 3h8.64M7 8.5 1.66 1.7a.74.74 0 0 1-.16-.46v0c0-.4.33-.74.74-.74h9.52c.4 0 .74.33.74.74v0a.74.74 0 0 1-.16.46L7 8.5ZM7 8.5v5M4 13.5h6" />
    </g>
  ),
});
