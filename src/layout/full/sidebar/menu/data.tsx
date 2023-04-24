import { es } from '@/i18n';
import { routes } from '@/routes';

export type IconType =
  | 'accounts'
  | 'dashboard'
  | 'invoices'
  | 'bills'
  | 'investments'
  | 'loans'
  | 'settings';
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
    title: es.menu.sidebar[routes.dashboard],
  },
  {
    exact: true,
    icon: 'accounts',
    path: routes.movement.index,
    title: es.menu.sidebar[routes.movement.index],
  },
  {
    exact: true,
    icon: 'invoices',
    path: routes.dashboard,
    title: 'Invoices',
  },
  {
    exact: true,
    icon: 'bills',
    path: routes.dashboard,
    title: 'Facturacion',
  },
  {
    exact: true,
    icon: 'investments',
    path: routes.dashboard,
    title: 'Inversiones',
  },
  {
    exact: true,
    icon: 'loans',
    path: routes.dashboard,
    title: 'Prestamos',
  },
  {
    exact: false,
    icon: 'settings',
    path: routes.settings.index,
    title: es.menu.sidebar[routes.settings.index],
  },
];
