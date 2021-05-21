import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

export const defaultRoutes: RouteProps[] = [
  {
    component: lazy(() => import('@app/pages/auth/login')),
    path: '/auth/login',
  },
];
