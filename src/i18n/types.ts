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
  | 'settings-accounts'
  | 'settings-categories'
  | 'settings-credit-cards';

export type SidebarMenuType = Record<SidebarMenuKeys, string>;
