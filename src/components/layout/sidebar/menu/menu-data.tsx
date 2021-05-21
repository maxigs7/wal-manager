import { ClipboardListIcon, ChartPieIcon } from '@heroicons/react/solid';

export interface IMenuItem {
  exact?: boolean;
  Icon(props: React.ComponentProps<'svg'>): JSX.Element;
  path: string;
  title: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    exact: true,
    Icon: ChartPieIcon,
    path: '/dashboard',
    title: 'Dashboard',
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    Icon: ClipboardListIcon,
    path: '/settings/categories',
    title: 'Categories',
  },
];
