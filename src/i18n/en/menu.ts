import { routes } from '@/routes';

import { SettingsMenuType, SidebarMenuType } from '../types';

const translations = {
  settings: {
    [routes.settings.account.index]: 'Accounts',
    [routes.settings.category.index]: 'Categories',
    [routes.settings.creditCard.index]: 'Credit Cards',
    [routes.settings.investments.index]: 'Investments',
    '/settings/loans': 'Loans',
    [routes.settings.user]: 'User',
  } as SettingsMenuType,
  sidebar: {
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    'my-accounts': 'My Accounts',
    investments: 'Investments',
    loans: 'Loans',
    invoices: 'Invoices',
    afip: 'AFIP',
    monotributo: 'Monotributo',
    bills: 'Bills',
    settings: 'Settings',
    'settings-user': 'User',
    'settings-accounts': 'Accounts',
  } as SidebarMenuType,
  navbar: {
    user: {
      lang: 'Language',
      profile: 'Profile',
      settings: 'Settings',
      signOut: 'Sign Out',
    },
  },
};

export default translations;
