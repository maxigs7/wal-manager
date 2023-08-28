import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DangerousIcon from '@mui/icons-material/Dangerous';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';

import { SidebarMenuKeys } from '@/i18n';
export type MenuItem = {
  exact?: boolean;
  group?: string;
  href?: string;
  id: SidebarMenuKeys;
  label?: string;
  new?: boolean;
  soon?: boolean;
  subItems?: MenuItem[];
};

export const getIcon = (id: string): typeof DashboardIcon | null => {
  switch (id) {
    case 'dashboard':
      return DashboardIcon;
    case 'accounts':
      return AccountBalanceIcon;
    case 'my-accounts':
      return null;
    case 'investments':
      return null;
    case 'loans':
      return null;
    case 'invoices':
      return ReceiptIcon;
    case 'afip':
      return DangerousIcon;
    case 'monotributo':
      return null;
    case 'bills':
      return null;
    case 'settings':
      return SettingsIcon;
    case 'settings-user':
      return null;
    case 'settings-accounts':
      return null;
    default:
      return null;
  }
};
