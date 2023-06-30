import { createIcon } from '@chakra-ui/react';

export const FlowerIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'FlowerIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8.75c.83 0 1.5-.67 1.5-1.49a1.5 1.5 0 0 0-3 0c0 .82.67 1.49 1.5 1.49Z" />
      <path d="M13.37 5.34a2.57 2.57 0 0 0-3.24-1.64 2.3 2.3 0 0 0-.65.3 2.58 2.58 0 1 0-4.96 0 2.3 2.3 0 0 0-.65-.31 2.56 2.56 0 1 0-1.59 4.87 3 3 0 0 0 .72.12 3 3 0 0 0-.5.51 2.54 2.54 0 0 0 .57 3.57 2.59 2.59 0 0 0 3.6-.56 2.47 2.47 0 0 0 .33-.64c.08.23.2.44.34.64a2.59 2.59 0 0 0 4.28-.17 2.54 2.54 0 0 0-.11-2.84 3 3 0 0 0-.5-.51 3 3 0 0 0 .71-.12 2.55 2.55 0 0 0 1.65-3.22v0Z" />
    </g>
  ),
});
