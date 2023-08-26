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
    dashboard: 'Tablero',
    accounts: 'Cuentas',
    'my-accounts': 'Mis Cuentas',
    investments: 'Inversiones',
    loans: 'Préstamos',
    invoices: 'Facturas',
    afip: 'AFIP',
    monotributo: 'Monotributo',
    bills: 'Facturas',
    settings: 'Configuración',
    'settings-user': 'Usuario',
    'settings-accounts': 'Cuentas',
  },
  navbar: {
    user: {
      lang: 'Idioma',
      profile: 'Perfil',
      settings: 'Configuracion',
      signOut: 'Cerrar Sesión',
    },
  },
};

export default translations;
