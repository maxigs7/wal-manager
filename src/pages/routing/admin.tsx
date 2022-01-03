import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const DashboardPage = lazy(() => import('../dashboard'));
const TransactionsPage = lazy(() => import('../transactions'));
const AccountsPage = lazy(() => import('../admin/accounts'));
const CategoriesPage = lazy(() => import('../admin/categories'));
const CreditCardsPage = lazy(() => import('../admin/credit-cards'));
const NotFoundPage = lazy(() => import('../not-found'));

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
