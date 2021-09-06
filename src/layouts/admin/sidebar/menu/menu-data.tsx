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
    path: '/',
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
    badge: 'soon',
    exact: true,
    icon: 'money-check-alt',
    path: '/',
    title: 'Transacciones',
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    icon: 'list-alt',
    path: '/admin/categories',
    title: 'Categorias',
  },
  {
    badge: 'soon',
    exact: true,
    icon: 'university',
    path: '/',
    title: 'Cuentas',
  },
  {
    badge: 'soon',
    exact: true,
    icon: 'credit-card',
    path: '/',
    title: 'Tarjetas',
  },
];
