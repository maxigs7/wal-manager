import { createIcon } from '@chakra-ui/react';

export const ParliamentIcon = createIcon({
  defaultProps: {
    fill: 'none',
  },
  displayName: 'ParliamentIcon',
  viewBox: '0 0 14 14',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.48 8.68h7.04v4.71H3.48V8.68ZM5.07 5.98h3.8" />
      <path d="M5.94 11.63c0-.59.48-1.06 1.06-1.06v0c.58 0 1.06.47 1.06 1.06v1.76H5.94v-1.76ZM5.07 8.68V5.97l1.9-2.94L8.9 5.97v2.7M.59 6.71v6.68h2.9V6.71l-1.45-2.2-1.45 2.2ZM10.52 6.71v6.68h2.89V6.71l-1.45-2.2-1.44 2.2ZM6.98 3.03V.55h1.25" />
    </g>
  ),
});
