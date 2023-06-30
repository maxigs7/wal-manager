import { createIcon } from '@chakra-ui/react';

export const AmbulanceIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'AmbulanceIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.16 10.77V4a1 1 0 0 0-1-1H1.7a1 1 0 0 0-1 1v6.63a1 1 0 0 0 1 1h.79M13.3 7.73H9.16" />
      <path d="M11.64 11.63h.68a1 1 0 0 0 1-1.01l-.02-3.18-1.4-2.85a1 1 0 0 0-.9-.56H9.16M2.5 11.66a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0" />
      <path d="M8.84 11.66a1.4 1.4 0 1 0 2.8 0 1.4 1.4 0 1 0-2.8 0M3.43 7h3M4.93 5.5v3M8.84 11.63H5.29" />
    </g>
  ),
});
