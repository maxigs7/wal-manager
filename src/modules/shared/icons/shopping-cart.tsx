import { createIcon } from '@chakra-ui/react';

export const ShoppingCartIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ShoppingCartIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.5.5h2.45l.87 8.65a1 1 0 0 0 1 .85h6.3a1 1 0 0 0 1-.68l1.33-4a1 1 0 0 0-.14-.9 1 1 0 0 0-.86-.42H3.3M10.95 13.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1ZM4.45 13.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" />
    </g>
  ),
});
