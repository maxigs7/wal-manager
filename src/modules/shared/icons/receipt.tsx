import { createIcon } from '@chakra-ui/react';

export const ReceiptIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ReceiptIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.2 4.72a1.33 1.33 0 0 0-1.26-.89H4.91a1.19 1.19 0 0 0-.25 2.36l1.57.34a1.33 1.33 0 0 1-.29 2.64h-.88a1.33 1.33 0 0 1-1.26-.9M5.5 3.83V2.5M5.5 10.5V9.17" />
      <path d="M12 .5H2.5a2 2 0 0 0-2 2v11L3 12l2.5 1.5L8 12l2.5 1.5V2a1.5 1.5 0 1 1 3 0v3.5h-3" />
    </g>
  ),
});
