import { createIcon } from '@chakra-ui/react';

export const FlashIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'FlashIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M4.25.5 2 5.81a.5.5 0 0 0 .46.69h2.79l-2 7 8.59-8.14a.5.5 0 0 0-.34-.86H7.75l2-4h-5.5Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
