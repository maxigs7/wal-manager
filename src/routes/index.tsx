import React, { lazy, LazyExoticComponent } from 'react';
import { RouteProps } from 'react-router-dom';

import AdminRoute from './admin.route';
import DefaultRoute from './default.route';

export interface IRoute {
  props: RouteProps;
  Route: React.FC<RouteProps>;
  Component: LazyExoticComponent<React.FC<any>>;
}

export const routes: IRoute[] = [
  {
    props: {
      path: '/auth/login',
    },
    Route: DefaultRoute,
    Component: lazy(() => import('@app/pages/auth/login')),
  },
  {
    props: {
      path: '/dashboard',
    },
    Route: AdminRoute,
    Component: lazy(() => import('@app/pages/dashboard')),
  },
  {
    props: {
      path: '/settings/categories',
    },
    Route: AdminRoute,
    Component: lazy(() => import('@app/pages/settings/categories')),
  },

  {
    props: {
      path: '/404',
    },
    Route: AdminRoute,
    Component: lazy(() => import('@app/pages/not-found')),
  },
];
