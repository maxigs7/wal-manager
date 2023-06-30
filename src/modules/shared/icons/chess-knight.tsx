import { createIcon } from '@chakra-ui/react';

export const ChessKnightIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ChessKnightIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.42 11.26a.97.97 0 0 1 .92-.67h7.32c.42 0 .79.27.92.67l.75 2.24H1.67l.75-2.24Z" />
      <path d="M3.57 10.6c.16-.84 1.3-1.79 2.12-2.42C7.63 6.65 7.45 5.35 7.14 5L5.19 6.1a1.23 1.23 0 0 1-1.43-.15v0a1.23 1.23 0 0 1-.24-1.55l1.46-2.48L4.42.66c.93-.33 3.5-.16 4.52.63 1.27 1 2.9 2.5 1.55 9.3" />
      <path d="M7.77 3.97A1.89 1.89 0 0 1 7.14 5" />
    </g>
  ),
});
