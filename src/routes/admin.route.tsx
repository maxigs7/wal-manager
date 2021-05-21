import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const DashboardPage = lazy(
  () => import(/* webpackChunkName: 'dashboard.page' */ '@app/pages/dashboard'),
);
const SettingsCategoriesPage = lazy(
  () => import(/* webpackChunkName: 'settings.category.page' */ '@app/pages/settings/categories'),
);
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: 'not-found.page' */ '@app/pages/not-found'),
);

export const adminRoutes: RouteProps[] = [
  {
    children: <DashboardPage />,
    path: '/dashboard',
  },
  {
    children: <SettingsCategoriesPage />,
    path: '/settings/categories',
  },
  {
    children: <NotFoundPage />,
    path: '/404',
  },
];
