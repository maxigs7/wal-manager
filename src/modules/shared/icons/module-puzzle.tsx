import { createIcon } from '@chakra-ui/react';

export const ModulePuzzleIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ModulePuzzleIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      d="M4.1 1.21a2 2 0 0 1 .6 1.33L6.52.72a.67.67 0 0 1 1 0l1.47 1.54c-.2.1-.4.23-.57.4a2.05 2.05 0 0 0 2.9 2.9c.17-.17.3-.36.4-.57l1.56 1.53a.67.67 0 0 1 0 1L11.46 9.3a2.04 2.04 0 1 1-2.16 2.16l-1.82 1.82a.67.67 0 0 1-1 0l-1.47-1.54c.2-.1.4-.23.56-.4a2.06 2.06 0 1 0-3.31-2.33L.72 7.48a.67.67 0 0 1 0-1L2.54 4.7a2 2 0 0 1-1.33-.6 2.04 2.04 0 1 1 2.9-2.89v0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});
