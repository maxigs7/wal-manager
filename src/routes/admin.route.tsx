import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { LazyAdminLayout } from '@layouts';

import { PrivateRoute } from './private.route';

const DashboardPage = lazy(
  () => import(/* webpackChunkName: 'dashboard.page' */ '@pages/dashboard'),
);

const CategoriesPage = lazy(
  () => import(/* webpackChunkName: 'admin.categories.page' */ '@pages/admin/categories'),
);

const AccountsPage = lazy(
  () => import(/* webpackChunkName: 'admin.accounts.page' */ '@pages/admin/accounts'),
);

const CreditCardsPage = lazy(
  () => import(/* webpackChunkName: 'admin.credit-cards.page' */ '@pages/admin/credit-cards'),
);

const NotFoundPage = lazy(
  () => import(/* webpackChunkName: 'not-found.page' */ '@pages/not-found'),
);

const PrivateWrapper: React.FC = () => (
  <PrivateRoute>
    <LazyAdminLayout />
  </PrivateRoute>
);

export const adminRoutes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateWrapper />,
    children: [
      {
        element: <AccountsPage />,
        path: 'admin/accounts',
      },
      {
        element: <CategoriesPage />,
        path: 'admin/categories',
      },
      {
        element: <CreditCardsPage />,
        path: 'admin/credit-cards',
      },
      {
        element: <DashboardPage />,
        path: 'dashboard',
        index: true,
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ],
  },
];
