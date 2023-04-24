import { es } from '@/i18n';
import { routes } from '@/routes';

export interface IMenuItem {
  exact?: boolean;
  href: string;
  label: string;
}

export const menuData: IMenuItem[] = [
  {
    exact: true,
    href: routes.settings.user,
    label: es.menu.settings[routes.settings.user],
  },
  {
    exact: true,
    href: routes.settings.category.index,
    label: es.menu.settings[routes.settings.category.index],
  },
  {
    exact: true,
    href: routes.settings.account.index,
    label: es.menu.settings[routes.settings.account.index],
  },
  {
    exact: true,
    href: routes.settings.investments.index,
    label: es.menu.settings[routes.settings.investments.index],
  },
  {
    exact: true,
    href: routes.settings.creditCard.index,
    label: es.menu.settings[routes.settings.creditCard.index],
  },
];
