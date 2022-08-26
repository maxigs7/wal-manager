import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LayoutDefaultWrapper = lazy(() => import('./layout-default-with-routing'));
const LayoutFullWrapper = lazy(() => import('./layout-full-with-routing'));

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
