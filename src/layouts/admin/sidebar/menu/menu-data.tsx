import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  badge?: string;
  exact?: boolean;
  icon: IconProp;
  path: string;
  title: string;
}

export const quickRoutes: IMenuItem[] = [
  {
    badge: 'soon',
    exact: true,
    icon: 'bolt',
    path: '/transactions/create',
    title: 'Crear transaccion',
  },
];

export const mainRoutes: IMenuItem[] = [
  {
    exact: true,
    icon: 'tachometer-alt',
    path: '/dashboard',
    title: 'Dashboard',
  },
  {
    exact: true,
    icon: 'money-check-alt',
    path: '/transactions',
    title: 'Movimientos',
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: '/admin/categories',
    title: 'Categorias',
  },
  {
    icon: 'university',
    path: '/admin/accounts',
    title: 'Cuentas',
  },
  {
    icon: 'credit-card',
    path: '/admin/credit-cards',
    title: 'Tarjetas',
  },
];
