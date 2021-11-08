import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

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

export const adminRoutes: RouteProps[] = [
  {
    children: <DashboardPage />,
    path: '/dashboard',
  },
  {
    children: <AccountsPage />,
    path: '/admin/accounts',
  },
  {
    children: <CategoriesPage />,
    path: '/admin/categories',
  },
  {
    children: <CreditCardsPage />,
    path: '/admin/credit-cards',
  },
  {
    children: <NotFoundPage />,
    path: '/404',
  },
];
