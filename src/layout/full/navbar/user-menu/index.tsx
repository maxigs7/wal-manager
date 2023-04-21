import { Menu } from '@chakra-ui/react';

import { UserMenuButton } from './button';
import { UserMenuList } from './menu';

const UserMenu: React.FC = () => {
  return (
    <Menu>
      <UserMenuButton />
      <UserMenuList />
    </Menu>
  );
};

export { UserMenu };
