import { createIcon } from '@chakra-ui/react';

export const DiscountPercentBadgeIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'DiscountPercentBadgeIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.83 1a1.9 1.9 0 0 1 2.4 0l.32.27.43-.07a1.9 1.9 0 0 1 2.07 1.2l.15.4.4.15a1.9 1.9 0 0 1 1.2 2.07l-.07.43.27.33a1.9 1.9 0 0 1 0 2.39l-.27.33.07.43A1.9 1.9 0 0 1 11.6 11l-.4.15-.15.4a1.9 1.9 0 0 1-2.07 1.2l-.42-.07-.34.27a1.9 1.9 0 0 1-2.39 0l-.33-.27-.43.07A1.9 1.9 0 0 1 3 11.55l-.15-.4-.4-.15a1.9 1.9 0 0 1-1.2-2.07l.07-.43-.27-.33a1.9 1.9 0 0 1 0-2.4l.27-.32-.07-.43a1.9 1.9 0 0 1 1.2-2.07l.4-.15.15-.4a1.9 1.9 0 0 1 2.07-1.2l.43.07.33-.27ZM4.53 9.47l5-5" />
      <path d="M5.03 5.47a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM9.03 9.47a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </g>
  ),
});
