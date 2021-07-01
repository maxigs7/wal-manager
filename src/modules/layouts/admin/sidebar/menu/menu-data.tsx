import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IMenuItem {
  exact?: boolean;
  Icon(props: React.ComponentProps<any>): JSX.Element;
  path: string;
  title: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    exact: true,
    Icon: (props) => <FontAwesomeIcon icon="tachometer-alt" {...props} fixedWidth />,
    path: '/dashboard',
    title: 'Dashboard',
  },
];

export const uiRoutes: IMenuItem[] = [
  {
    Icon: (props) => <FontAwesomeIcon icon="list-alt" {...props} fixedWidth />,
    path: '/ui/form',
    title: 'Form',
  },
];

export const adminRoutes: IMenuItem[] = [
  {
    Icon: (props) => <FontAwesomeIcon icon="list-alt" {...props} fixedWidth />,
    path: '/settings/categories',
    title: 'Categories',
  },
];
