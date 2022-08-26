import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const AccountsPage = lazy(() => import('@pages/admin/accounts'));
const CategoriesPage = lazy(() => import('@pages/admin/categories'));
const CreditCardsPage = lazy(() => import('@pages/admin/credit-cards'));
const DashboardPage = lazy(() => import('@pages/dashboard'));
const NotFoundPage = lazy(() => import('@pages/not-found'));
const TransactionsPage = lazy(() => import('@pages/transactions'));

export const routes: RouteObject[] = [
  {
    element: <DashboardPage />,
    path: 'dashboard',
    index: true,
  },
  {
    element: <TransactionsPage />,
    path: 'transactions/*',
  },
  {
    path: 'admin',
    children: [
      {
        element: <AccountsPage />,
        path: 'accounts/*',
      },
      {
        path: 'categories/*',
        children: [
          {
            element: <CategoriesPage />,
            path: ':type/*',
          },
          {
            element: <Navigate to="/admin/categories/expenses" />,
            index: true,
            path: '',
          },
        ],
      },
      {
        element: <CreditCardsPage />,
        path: 'credit-cards/*',
      },
      { path: '*', index: true, element: <Navigate to="/404" /> },
    ],
  },
  {
    element: <NotFoundPage />,
    path: '404',
  },
  { path: '', index: true, element: <Navigate to="/dashboard" /> },
  { path: '*', element: <Navigate to="/404" /> },
];
