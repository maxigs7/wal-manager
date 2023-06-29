import { createIcon } from '@chakra-ui/react';

export const MoneyCashBillIcon = createIcon({
  displayName: 'MoneyCashBillIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect height="8" rx="1" width="10.5" x=".5" y="1.75" />
      <circle cx="5.75" cy="5.75" r="1.5" />
      <path d="M3.5 12.25h9a1 1 0 0 0 1-1v-5" />
    </g>
  ),
});
