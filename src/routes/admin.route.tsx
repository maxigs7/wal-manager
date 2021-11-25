import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { LazyAdminLayout } from '@layouts';

import { PrivateRoute } from './private.route';

const DashboardPage = lazy(
  () => import(/* webpackChunkName: 'dashboard.page' */ '@pages/dashboard'),
);

const TransactionsPage = lazy(
  () => import(/* webpackChunkName: 'transactions.page' */ '@pages/transactions'),
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
        element: <DashboardPage />,
        path: 'dashboard',
        index: true,
      },
      {
        path: 'admin',
        children: [
          {
            element: <AccountsPage />,
            path: 'accounts/*',
          },
          {
            element: <CategoriesPage />,
            path: 'categories/*',
          },
          {
            element: <CreditCardsPage />,
            path: 'credit-cards/*',
          },
          { path: '*', index: true, element: <Navigate to="/404" /> },
        ],
      },
      {
        element: <TransactionsPage />,
        path: 'transactions',
      },

      {
        element: <NotFoundPage />,
        path: '404',
      },
      { path: '', index: true, element: <Navigate to="/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];
