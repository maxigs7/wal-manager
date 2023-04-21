import { MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Link } from '@/lib/chakra-ui';
import { routes } from '@/routes';

import { SignOutMenuItem } from './sign-out';

const UserMenuList: React.FC = () => {
  return (
    <MenuList>
      <MenuItem as={Link} href={routes.user.profile} prefetch={false}>
        {es.menu.user.profile}
      </MenuItem>
      <MenuItem as={Link} href={routes.user.settings} prefetch={false}>
        {es.menu.user.settings}
      </MenuItem>
      <MenuDivider />
      <SignOutMenuItem />
    </MenuList>
  );
};

export { UserMenuList };
