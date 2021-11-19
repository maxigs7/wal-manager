import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AUTH_SIGN_UP_ENABLED } from '@constants';
import { LazyDefaultLayout } from '@layouts';

const SignIn = lazy(
  () => import(/* webpackChunkName: 'auth.sign-in.page' */ '@pages/auth/sign-in'),
);
const SignUp = lazy(
  () => import(/* webpackChunkName: 'auth.sign-up.page' */ '@pages/auth/sign-up'),
);

export const defaultRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <LazyDefaultLayout />,
    children: [
      ...(AUTH_SIGN_UP_ENABLED ? [{ element: <SignUp />, path: 'sign-up' }] : []),
      { path: 'sign-in', element: <SignIn />, index: true },
      { path: '', element: <Navigate to="/auth/sign-in" /> },
    ],
  },
];
