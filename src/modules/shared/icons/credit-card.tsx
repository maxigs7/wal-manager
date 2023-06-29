import { createIcon } from '@chakra-ui/react';

export const CreditCardIcon = createIcon({
  displayName: 'CreditCardIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect height="9.5" rx="1" width="13" x=".5" y="2.25" />
      <path d="M.5 5.75h13M9.5 9.25H11" />
    </g>
  ),
});
