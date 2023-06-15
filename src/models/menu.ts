import {
  CreditCardIcon,
  TagIcon,
  UserIcon,
  BankIcon,
  MoneyCashBillIcon,
  MoneyCashBagIcon,
  FavoriteGiveHeartIcon,
  DashboardIcon,
  FilesIcon,
  SettingsIcon,
} from '@/assets';

export type IconType =
  | 'accounts'
  | 'bills'
  | 'categories'
  | 'credit-cards'
  | 'dashboard'
  | 'investments'
  | 'invoices'
  | 'loans'
  | 'settings'
  | 'user';

export type MenuItem = {
  comingSoon: boolean;
  exact: boolean;
  icon: string;
  id: number;
  href: string;
  title: string;
};

export const getIcon = (key: IconType) => {
  switch (key) {
    case 'accounts':
      return BankIcon;
    case 'bills':
      return MoneyCashBillIcon;
    case 'categories':
      return TagIcon;
    case 'credit-cards':
      return CreditCardIcon;
    case 'dashboard':
      return DashboardIcon;
    case 'investments':
      return MoneyCashBagIcon;
    case 'invoices':
      return FilesIcon;
    case 'loans':
      return FavoriteGiveHeartIcon;
    case 'settings':
      return SettingsIcon;
    case 'user':
      return UserIcon;
    default:
      return null;
  }
};
