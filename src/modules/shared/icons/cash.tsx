import { createIcon } from '@chakra-ui/react';

export const CashIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'CashIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.5 2.5h-11a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1Z" />
      <path d="M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2.77 7.25a.25.25 0 0 1 0-.5M2.77 7.25a.25.25 0 0 0 0-.5M11.23 7.25a.25.25 0 1 1 0-.5M11.23 7.25a.25.25 0 1 0 0-.5" />
    </g>
  ),
});
