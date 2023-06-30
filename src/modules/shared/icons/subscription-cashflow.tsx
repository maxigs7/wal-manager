import { createIcon } from '@chakra-ui/react';

export const SubscriptionCashflowIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'SubscriptionCashflowIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.35 5.3a1.17 1.17 0 0 0-1.1-.77h-.9a1.04 1.04 0 0 0-.22 2.06l1.37.3a1.17 1.17 0 0 1-.25 2.3h-.78c-.5 0-.94-.32-1.1-.77M6.86 4.53V3.36M6.86 10.36V9.2M2 13.5V11h2.5" />
      <path d="M13.39 5.8a6.5 6.5 0 0 1-11.4 5.35M.61 8.2a6.5 6.5 0 0 1 11.4-5.35" />
      <path d="M12 .5V3H9.5" />
    </g>
  ),
});
