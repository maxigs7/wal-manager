import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

import { AUTH_SIGN_UP_ENABLED } from '@constants';

export const defaultRoutes: RouteProps[] = [
  {
    component: lazy(
      () => import(/* webpackChunkName: 'auth.sign-in.page' */ '@pages/auth/sign-in'),
    ),
    path: '/auth/sign-in',
  },
  ...(AUTH_SIGN_UP_ENABLED
    ? [
        {
          component: lazy(
            () => import(/* webpackChunkName: 'auth.sign-up.page' */ '@pages/auth/sign-up'),
          ),
          path: '/auth/sign-up',
        },
      ]
    : []),
];
