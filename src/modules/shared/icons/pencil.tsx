import { createIcon } from '@chakra-ui/react';

export const PencilIcon = createIcon({
  displayName: 'PencilIcon',
  defaultProps: {
    fill: 'none',
  },
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M5 12.24.5 13.5 1.76 9 10 .8a1 1 0 0 1 1.43 0l1.77 1.78a1 1 0 0 1 0 1.42L5 12.24Z"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
});
