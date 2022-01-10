import { useMemo } from 'react';

import { useMediaQuery } from '@chakra-ui/react';

interface IMediaQueryReturn {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

const hook = (): IMediaQueryReturn => {
  const [smActive, mdActive, lgActive, xlActive] = useMediaQuery([
    '(min-width: 30em)',
    '(min-width: 48em)',
    '(min-width: 62em)',
    '(min-width: 80em)',
  ]);
  const xl = useMemo(() => xlActive, [xlActive]);
  const lg = useMemo(() => !xl && lgActive, [xlActive, lgActive]);
  const md = useMemo(() => !lgActive && mdActive, [lgActive, mdActive]);
  const sm = useMemo(() => !mdActive && smActive, [mdActive, smActive]);
  const xs = useMemo(() => !sm && !md && !lg && !xl, [xl, lg, md, sm]);

  return { xs, sm, md, lg, xl };
};

export default hook;
