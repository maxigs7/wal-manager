import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LayoutDefaultWrapper = lazy(() => import('../default'));
const LayoutFullWrapper = lazy(() => import('../full'));

export const routes: RouteObject[] = [
  {
    path: '/auth/*',
    element: <LayoutDefaultWrapper />,
  },
  {
    path: '/*',
    element: <LayoutFullWrapper />,
  },
];
