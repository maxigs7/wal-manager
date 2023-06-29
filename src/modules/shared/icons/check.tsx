import { createIcon } from '@chakra-ui/react';

export const CheckIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CheckIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="m.5 8.55 2.73 3.51a1 1 0 0 0 1.56.03L13.5 1.55"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  ),
});
