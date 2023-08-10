const sidebarKeys = [
  '/dashboard',
  '/accounts',
  '/settings',
  '/invoices',
  '/bills',
  '/investments',
  '/loans',
] as const;

export type SidebarMenuKeys = (typeof sidebarKeys)[number];

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
