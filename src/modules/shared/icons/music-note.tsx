import { createIcon } from '@chakra-ui/react';

export const MusicNoteIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'MusicNoteIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 13.42a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM11.5 10.92a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M13.5 8.92V1.08a.5.5 0 0 0-.63-.48l-8 2.22a.5.5 0 0 0-.37.48v8.12M4.5 5.92l9-2.5" />
    </g>
  ),
});
