import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import { default as LayoutAuth } from './auth';
import { default as LayoutDefault } from './default';
// export { default as LayoutFull } from './full';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const getAuthLayout = (page: ReactElement) => {
  return <LayoutAuth>{page}</LayoutAuth>;
};

export const getDefaultLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};
