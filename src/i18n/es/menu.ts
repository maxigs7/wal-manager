import { routes } from '@/routes';

export const menu = {
  settings: {
    [routes.settings.account.index]: 'Cuentas',
    [routes.settings.category.index]: 'Categorias',
    [routes.settings.creditCard.index]: 'Tarjetas',
    [routes.settings.investments.index]: 'Inversiones',
    [routes.settings.user]: 'Usuario',
  },
  sidebar: {
    [routes.dashboard]: 'Dashboard',
    [routes.movement.index]: 'Cuentas',
    [routes.settings.index]: 'Configuracion',
  },
  navbar: {
    user: {
      profile: 'Perfil',
      settings: 'Configuracion',
      signOut: 'Cerrar Sesión',
    },
  },
};
