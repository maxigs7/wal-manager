import { createIcon } from '@chakra-ui/react';

export const RadioIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'RadioIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 4h-11a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1ZM1.37 4 13.5.5" />
      <path d="M4.5 11.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9.5 8.75H11M9.5 11.25H11M.5 6.5h13" />
    </g>
  ),
});
