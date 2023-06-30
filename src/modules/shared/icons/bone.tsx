import { createIcon } from '@chakra-ui/react';

export const BoneIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'BoneIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M11.5 2.5a2 2 0 1 0-4 0 2 2 0 0 0 .59 1.41L3.91 8.09A2 2 0 0 0 2.5 7.5a2 2 0 1 0 0 4 2 2 0 0 0 4 0 2 2 0 0 0-.59-1.41l4.18-4.18a2 2 0 0 0 1.41.59 2 2 0 0 0 0-4Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
