import { createIcon } from '@chakra-ui/react';

export const PhoneIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PhoneIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M5.25 12.98a3.18 3.18 0 0 1-4-.44l-.44-.44a1.08 1.08 0 0 1 0-1.5L2.7 8.7a1.07 1.07 0 0 1 1.5 0 1.08 1.08 0 0 0 1.5 0l3-3a1.06 1.06 0 0 0 0-1.5 1.07 1.07 0 0 1 0-1.5l1.9-1.9a1.08 1.08 0 0 1 1.5 0l.44.46A3.18 3.18 0 0 1 13 5.26a28.88 28.88 0 0 1-7.74 7.72Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
