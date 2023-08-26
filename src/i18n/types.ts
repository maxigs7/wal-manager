export type SidebarMenuKeys =
  | 'dashboard'
  | 'accounts'
  | 'my-accounts'
  | 'investments'
  | 'loans'
  | 'invoices'
  | 'afip'
  | 'monotributo'
  | 'bills'
  | 'settings'
  | 'settings-user'
  | 'settings-accounts';

export type SidebarMenuType = Record<SidebarMenuKeys, string>;

const settingsKeys = [
  '/settings/accounts',
  '/settings/categories',
  '/settings/credit-cards',
  '/settings/investments',
  '/settings/loans',
  '/settings/user',
] as const;

export type SettingsMenuKeys = (typeof settingsKeys)[number];

export type SettingsMenuType = Record<SettingsMenuKeys, string>;
