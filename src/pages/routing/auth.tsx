import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AUTH_SIGN_UP_ENABLED } from '@shared';

const SignIn = lazy(() => import('../auth/sign-in'));
const SignUp = lazy(() => import('../auth/sign-up'));

export const routes: RouteObject[] = [
  ...(AUTH_SIGN_UP_ENABLED ? [{ element: <SignUp />, path: 'sign-up' }] : []),
  { path: 'sign-in', element: <SignIn />, index: true },
  { path: '', element: <Navigate to="/auth/sign-in" /> },
];
