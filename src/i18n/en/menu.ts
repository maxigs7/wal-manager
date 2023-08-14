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
    [routes.dashboard]: 'Dashboard',
    [routes.accounts.index]: 'Accounts',
    '/invoices': 'Invoices',
    '/bills': 'Billing',
    '/investments': 'Investments',
    '/loans': 'Loans',
    [routes.settings.index]: 'Settings',
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
