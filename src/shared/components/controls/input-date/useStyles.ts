import { useMemo } from 'react';

import { StyleObjectOrFn, useTheme, css as chakraCSS } from '@chakra-ui/react';

import { useNextFont } from '@lib';

import breakpoints from 'theme/foundations/breakpoints';

export const useStyles = () => {
  const theme = useTheme();
  const font = useNextFont();

  return useMemo(() => {
    const defaultStyles: StyleObjectOrFn = {
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.100',
      boxShadow: 'sm',
      fontFamily: font.style.fontFamily,
      p: 2,

      '& .react-datepicker': {
        '&__header': {
          bg: 'none',
          borderBottom: 'none',
        },
        '&__month': {
          mt: 0,
        },
        '&__day-name': {
          color: 'gray.400',
          fontWeight: 'medium',
          w: 7,
        },
        '&__day': {
          lineHeight: '28px',
          color: 'gray.700',
          w: 7,
          h: 7,
          borderRadius: 'full',
        },
        '&__day:not(.react-datepicker__day--selected):hover': {
          bg: 'white',
          boxShadow: '0 0 1px 1px rgba(0,0,0,0.2)',
        },
        '&__day--keyboard-selected': {
          bg: 'transparent',
        },
        '&__day--today': {
          bg: 'gray.100',
          fontWeight: '400',
        },
        '&__day--selected': {
          bg: 'gray.700',
          color: 'white',
        },
        '&__day--outside-month': {
          color: 'gray.300',
        },
      },
    };
    return chakraCSS(defaultStyles)({
      ...theme,
      breakpoints,
    });
  }, [font.style.fontFamily, theme]);
};
