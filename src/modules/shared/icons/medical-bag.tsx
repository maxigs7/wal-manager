import { createIcon } from '@chakra-ui/react';

export const MedicalBagIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'MedicalBagIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8.5h4M7 6.5v4M12.5 3.5h-11a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1ZM10 3.5v-2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2" />
    </g>
  ),
});
