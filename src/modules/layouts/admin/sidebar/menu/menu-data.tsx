import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  exact?: boolean;
  icon: IconProp;
  path: string;
  title: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    exact: true,
    icon: 'tachometer-alt',
    path: '/dashboard',
    title: 'Dashboard',
  },
];

export const uiRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: '/ui/form',
    title: 'Form',
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: '/settings/categories',
    title: 'Categories',
  },
];
