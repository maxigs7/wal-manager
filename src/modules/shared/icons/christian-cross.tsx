import { createIcon } from '@chakra-ui/react';

export const ChristianCrossIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ChristianCrossIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M12 3.5H9v-3H5v3H2v4h3v6h4v-6h3v-4Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
