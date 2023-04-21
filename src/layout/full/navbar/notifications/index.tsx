import { Menu } from '@chakra-ui/react';

import { NotificationsMenuButton } from './button';
import { NotificationsMenuList } from './menu';

const NotificationsMenu: React.FC = () => {
  return (
    <Menu>
      <NotificationsMenuButton />
      <NotificationsMenuList />
    </Menu>
  );
};

export { NotificationsMenu };
