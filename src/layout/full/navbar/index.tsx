import React from 'react';

import { Flex } from '@chakra-ui/react';

import { ColorModeToggle } from './color-mode-toggle';
import { Hamburger } from './hamburger';
import { NotificationsMenu } from './notifications';
import { UserMenu } from './user-menu';
import { NavbarWrapper } from './wrapper';

export const Navbar: React.FC = () => {
  return (
    <NavbarWrapper>
      <Flex align="center" h="full">
        <Hamburger />
      </Flex>
      <Flex align="center" h="full" ml="auto">
        <ColorModeToggle />
        <NotificationsMenu />
        <UserMenu />
      </Flex>
    </NavbarWrapper>
  );
};
