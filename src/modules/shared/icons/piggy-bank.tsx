import { createIcon } from '@chakra-ui/react';

export const PiggyBankIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'PiggyBankIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M.9 2.68c.25.68.73 1.2 1.23 1.56M6.75 4.9H4.9M9.83 6.4a.25.25 0 1 1 0-.5M9.83 6.4a.25.25 0 0 0 0-.5" />
      <path d="M10.6 1.28v2.07c1.57.65 1.85 1.76 1.85 3.21l.87.72V9.5c-.51 1.11-1.47 1.69-2.72 2.13v.98a.5.5 0 0 1-.5.5H8.35a.5.5 0 0 1-.5-.5v-.98H4.71v.9a.5.5 0 0 1-.5.5H2.45a.5.5 0 0 1-.5-.5v-1.76c0-.05-.1-.3-.21-.7C1.39 8.9.8 6.95 1.64 5.1c.7-1.54 2.38-2.72 6.03-2.52a2.73 2.73 0 0 1 2.6-1.7c.21 0 .33.19.33.39Z" />
    </g>
  ),
});
