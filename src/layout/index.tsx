import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

import { default as AuthLayout } from './auth';
import { default as DefaultLayout } from './default';
import { default as FullLayout, useLayout as useFullLayout } from './full';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const getAuthLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getDefaultLayout = (page: ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getFullLayout = (page: ReactElement) => {
  return <FullLayout>{page}</FullLayout>;
};

export { useFullLayout };
