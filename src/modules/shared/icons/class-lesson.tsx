import { createIcon } from '@chakra-ui/react';

export const ClassLessonIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ClassLessonIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.35.5h6.3c.47 0 .85.38.85.85v6.78c0 .47-.38.85-.85.85H7.5M3.15 4a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" />
      <path d="M9 5.53c0-.57-.46-1.03-1.03-1.03H3.15v0A2.65 2.65 0 0 0 .5 7.15V9.5h1.14l.37 4h2.27l.88-6.95h2.81C8.54 6.55 9 6.1 9 5.54v0Z" />
    </g>
  ),
});
