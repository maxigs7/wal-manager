import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const ProfilePage = lazy(
  () => import(/* webpackChunkName: 'settings.profile.page' */ '@app/pages/settings/profile'),
);
const CategoriesPage = lazy(
  () => import(/* webpackChunkName: 'settings.categories.page' */ '@app/pages/settings/categories'),
);

export const settingsRoutes: RouteProps[] = [
  {
    children: <ProfilePage />,
    path: '/settings/profile',
  },
  {
    children: <CategoriesPage />,
    path: '/settings/categories',
  },
];
