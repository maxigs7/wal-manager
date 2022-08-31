import { useMediaQuery as useChakraMediaQuery, useTheme } from '@chakra-ui/react';
import { useMemo } from 'react';


interface IMediaQueryReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xl2: boolean;
}

export const useMediaQuery = (): IMediaQueryReturn => {
  const { breakpoints } = useTheme();
  const [smActive, mdActive, lgActive, xlActive, xl2Active] = useChakraMediaQuery([
    `(min-width: ${breakpoints.sm})`,
    `(min-width: ${breakpoints.md})`,
    `(min-width: ${breakpoints.lg})`,
    `(min-width: ${breakpoints.xl})`,
    `(min-width: ${breakpoints['2xl']})`,
  ]);
  const xl2 = useMemo(() => xl2Active, [xl2Active]);
  const xl = useMemo(() => !xl2Active && xlActive, [xl2Active, xlActive]);
  const lg = useMemo(() => !xlActive && lgActive, [xlActive, lgActive]);
  const md = useMemo(() => !lgActive && mdActive, [lgActive, mdActive]);
  const sm = useMemo(() => !mdActive && smActive, [mdActive, smActive]);
  const xs = useMemo(() => !sm && !md && !lg && !xl && !xl2, [xl2, xl, lg, md, sm]);

  return { xs, sm, md, lg, xl, xl2 };
};
