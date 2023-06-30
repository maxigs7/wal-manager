import { createIcon } from '@chakra-ui/react';

export const CoffeeMugIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CoffeeMugIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5.5h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a1 1 0 0 1 1-1v0ZM9 6.5h.5a2.5 2.5 0 0 1 0 5H9M4 .5v2M7 .5v2" />
    </g>
  ),
});
