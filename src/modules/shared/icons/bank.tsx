import { createIcon } from '@chakra-ui/react';

export const BankIcon = createIcon({
  displayName: 'BankIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12.91 5.5H1.09c-.56 0-.8-.61-.36-.9L6.64.73a.71.71 0 0 1 .72 0l5.91 3.87c.44.29.2.9-.36.9Z" />
      <rect height="2.5" rx=".5" width="13" x=".5" y="11" />
      <path d="M2 5.5V11M4.5 5.5V11M7 5.5V11M9.5 5.5V11M12 5.5V11" />
    </g>
  ),
});
