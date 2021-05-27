import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const defaultRoutes: RouteProps[] = [
  {
    component: lazy(
      () => import(/* webpackChunkName: 'auth.login.page' */ '@app/pages/auth/login'),
    ),
    path: '/auth/login',
  },
];
