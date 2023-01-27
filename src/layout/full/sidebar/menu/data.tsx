import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { es } from '@i18n';
import { routes } from '@routes';

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
    path: routes.dashboard,
    title: es.menu[routes.dashboard],
  },
  {
    exact: true,
    icon: 'money-check-alt',
    path: routes.movement.index,
    title: es.menu[routes.movement.index],
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: routes.admin.category.index,
    title: es.menu[routes.admin.category.index],
  },
  {
    icon: 'university',
    path: routes.admin.account.index,
    title: es.menu[routes.admin.account.index],
  },
  {
    icon: 'credit-card',
    path: routes.admin.creditCard.index,
    title: es.menu[routes.admin.creditCard.index],
  },
];
