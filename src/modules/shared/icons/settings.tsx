import { createIcon } from '@chakra-ui/react';

export const SettingsIcon = createIcon({
  displayName: 'SettingsIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="2" cy="4.5" r="1.5" />
      <path d="M2 6v7.5M2 .5V3" />
      <circle cx="12" cy="4.5" r="1.5" />
      <path d="M12 3V.5M12 13.5V6" />
      <circle cx="7" cy="7" r="1.5" />
      <path d="M7 .5v5M7 8.5v5" />
    </g>
  ),
});
