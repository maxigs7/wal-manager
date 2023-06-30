import { createIcon } from '@chakra-ui/react';

export const TransferVanIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'TransferVanIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.16 10.89V4.1a1 1 0 0 0-1-1H1.7a1 1 0 0 0-1 1v6.63a1 1 0 0 0 1 1h.75M13.3 7.84H9.16M11.95 11.54h.35a1 1 0 0 0 1-1v-3L11.9 4.7a1 1 0 0 0-.9-.56H9.35" />
      <path d="M2.5 11.76a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0M8.84 11.76a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0M8.58 11.73H5.64" />
    </g>
  ),
});
