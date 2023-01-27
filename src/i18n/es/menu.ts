import { routes } from '@routes';

export const menu = {
  admin: 'Administración',
  overview: 'General',

  // Routes
  [routes.dashboard]: 'Dashboard',
  [routes.movement.index]: 'Movimientos',
  [routes.admin.category.index]: 'Categorias',
  [routes.admin.account.index]: 'Cuentas',
  [routes.admin.creditCard.index]: 'Tarjetas',
};
