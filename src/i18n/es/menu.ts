import { routes } from '@/routes';

import { SettingsMenuType, SidebarMenuType } from '../types';

const translations = {
  settings: {
    [routes.settings.account.index]: 'Cuentas',
    [routes.settings.category.index]: 'Categorias',
    [routes.settings.creditCard.index]: 'Tarjetas',
    [routes.settings.investments.index]: 'Inversiones',
    '/settings/loans': 'Prestamos',
    [routes.settings.user]: 'Usuario',
  } as SettingsMenuType,
  sidebar: {
    [routes.dashboard]: 'Dashboard',
    [routes.accounts.index]: 'Cuentas',
    '/invoices': 'Invoices',
    '/bills': 'Facturacion',
    '/investments': 'Inversiones',
    '/loans': 'Prestamos',
    [routes.settings.index]: 'Configuracion',
  } as SidebarMenuType,
  navbar: {
    user: {
      profile: 'Perfil',
      settings: 'Configuracion',
      signOut: 'Cerrar Sesión',
    },
  },
};

export default translations;
