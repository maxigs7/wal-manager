import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { es } from '@i18n';

export interface IMenuItem {
  badge?: string;
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
    title: es.menu['/dashboard'],
  },
  {
    exact: true,
    icon: 'money-check-alt',
    path: '/transactions',
    title: es.menu['/transactions'],
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: '/admin/categories',
    title: es.menu['/admin/categories'],
  },
  {
    icon: 'university',
    path: '/admin/accounts',
    title: es.menu['/admin/accounts'],
  },
  {
    icon: 'credit-card',
    path: '/admin/credit-cards',
    title: es.menu['/admin/credit-cards'],
  },
];
