import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const DashboardPage = lazy(
  () => import(/* webpackChunkName: 'dashboard.page' */ '@app/pages/dashboard'),
);

const UIFormPage = lazy(() => import(/* webpackChunkName: 'ui.form.page' */ '@app/pages/ui/form'));

const SettingsPage = lazy(
  () => import(/* webpackChunkName: 'settings.page' */ '@app/pages/settings'),
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
    children: <UIFormPage />,
    path: '/ui/form',
  },
  {
    children: <SettingsPage />,
    path: '/settings',
  },
  {
    children: <NotFoundPage />,
    path: '/404',
  },
];
