import { createIcon } from '@chakra-ui/react';

export const GoogleIcon = createIcon({
  displayName: 'GoogleIcon',
  viewBox: '0 0 36 36',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g fill="none" fillRule="evenodd">
      <path
        d="M34.437 18.602c0-1.15-.106-2.258-.301-3.32H18.549v6.28h8.907c-.384 2.029-1.55 3.748-3.302 4.9v4.072h5.348c3.13-2.826 4.935-6.988 4.935-11.932z"
        fill="#4285F4"
      />
      <path
        d="M18.55 34.467c4.468 0 8.214-1.453 10.952-3.933l-5.348-4.073c-1.482.974-3.378 1.55-5.605 1.55-4.31 0-7.958-2.855-9.26-6.693H3.76v4.206c2.723 5.306 8.32 8.943 14.79 8.943z"
        fill="#34A853"
      />
      <path
        d="M9.29 21.318a9.591 9.591 0 01-.52-3.084c0-1.07.188-2.11.52-3.085v-4.206H3.76a15.98 15.98 0 000 14.581l5.53-4.206z"
        fill="#FBBC05"
      />
      <path
        d="M18.55 8.456c2.43 0 4.61.82 6.326 2.428l4.747-4.656C26.756 3.608 23.01 2 18.549 2 12.08 2 6.483 5.638 3.76 10.943l5.53 4.206c1.3-3.837 4.95-6.693 9.26-6.693z"
        fill="#EA4335"
      />
    </g>
  ),
});
