import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const defaultRoutes: RouteProps[] = [
  {
    component: lazy(
      () => import(/* webpackChunkName: 'auth.sign-in.page' */ '@pages/auth/sign-in'),
    ),
    path: '/auth/sign-in',
  },
  {
    component: lazy(
      () => import(/* webpackChunkName: 'auth.sign-up.page' */ '@pages/auth/sign-up'),
    ),
    path: '/auth/sign-up',
  },
];
