import { useMemo } from 'react';

import { useMediaQuery, useTheme } from '@chakra-ui/react';

interface IMediaQueryReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xl2: boolean;
}

export const useMedia = (): IMediaQueryReturn => {
  const theme = useTheme();
  const [smActive, mdActive, lgActive, xlActive, xl2Active] = useMediaQuery([
    `(min-width: ${theme.breakpoints.sm})`,
    `(min-width: ${theme.breakpoints.md})`,
    `(min-width: ${theme.breakpoints.lg})`,
    `(min-width: ${theme.breakpoints.xl})`,
    `(min-width: ${theme.breakpoints['2xl']})`,
  ]);
  const xl2 = useMemo(() => xl2Active, [xl2Active]);
  const xl = useMemo(() => !xl2 && xlActive, [xl2Active, xlActive]);
  const lg = useMemo(() => !xl && lgActive, [xlActive, lgActive]);
  const md = useMemo(() => !lgActive && mdActive, [lgActive, mdActive]);
  const sm = useMemo(() => !mdActive && smActive, [mdActive, smActive]);
  const xs = useMemo(() => !sm && !md && !lg && !xl, [xl, lg, md, sm]);

  return { xs, sm, md, lg, xl, xl2 };
};
