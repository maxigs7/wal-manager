import { es } from '@/i18n';
import { routes } from '@/routes';

export type IconType = 'dashboard' | 'movements' | 'categories' | 'accounts' | 'creditCards';
export interface IMenuItem {
  badge?: string;
  exact?: boolean;
  icon: IconType;
  path: string;
  title: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    exact: true,
    icon: 'dashboard',
    path: routes.dashboard,
    title: es.menu[routes.dashboard],
  },
  {
    exact: true,
    icon: 'movements',
    path: routes.movement.index,
    title: es.menu[routes.movement.index],
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'categories',
    path: routes.admin.category.index,
    title: es.menu[routes.admin.category.index],
  },
  {
    icon: 'accounts',
    path: routes.admin.account.index,
    title: es.menu[routes.admin.account.index],
  },
  {
    icon: 'creditCards',
    path: routes.admin.creditCard.index,
    title: es.menu[routes.admin.creditCard.index],
  },
];
