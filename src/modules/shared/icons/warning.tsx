import { createIcon } from '@chakra-ui/react';

export const WarningIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'WarningIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.89 1.05a1 1 0 0 0-1.78 0l-5.5 11a1 1 0 0 0 .89 1.45h11a1 1 0 0 0 .89-1.45l-5.5-11ZM7 5v3.25" />
      <path d="M7 11a.25.25 0 1 1 0-.5M7 11a.25.25 0 1 0 0-.5" />
    </g>
  ),
});
