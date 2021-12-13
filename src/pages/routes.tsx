import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import { AUTH_SIGN_UP_ENABLED } from '@shared';

import { LayoutDefaultWrapper } from './default';
import { LayoutFullWrapper } from './full';

const SignIn = lazy(() => import(/* webpackChunkName: 'auth.sign-in.page' */ './auth/sign-in'));
const SignUp = lazy(() => import(/* webpackChunkName: 'auth.sign-up.page' */ './auth/sign-up'));

const DashboardPage = lazy(() => import(/* webpackChunkName: 'dashboard.page' */ './dashboard'));

const TransactionsPage = lazy(
  () => import(/* webpackChunkName: 'transactions.page' */ './transactions'),
);

const CategoriesPage = lazy(
  () => import(/* webpackChunkName: 'admin.categories.page' */ './admin/categories'),
);

const AccountsPage = lazy(
  () => import(/* webpackChunkName: 'admin.accounts.page' */ './admin/accounts'),
);

const CreditCardsPage = lazy(
  () => import(/* webpackChunkName: 'admin.credit-cards.page' */ './admin/credit-cards'),
);

const NotFoundPage = lazy(() => import(/* webpackChunkName: 'not-found.page' */ './not-found'));

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <LayoutDefaultWrapper />,
    children: [
      ...(AUTH_SIGN_UP_ENABLED ? [{ element: <SignUp />, path: 'sign-up' }] : []),
      { path: 'sign-in', element: <SignIn />, index: true },
      { path: '', element: <Navigate to="/auth/sign-in" /> },
    ],
  },
  {
    path: '/',
    element: <LayoutFullWrapper />,
    children: [
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
    ],
  },
];
