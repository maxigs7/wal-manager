import { Flex, Heading, IconButton, Link } from '@chakra-ui/react';
import NavLink from 'next/link';
import React from 'react';

import { es } from '@i18n';
import { ColorModeToggle, Icon, Logo } from '@shared';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

const Header: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => (
  <Flex align="center" justify="space-between" px="2" py="4" w="full">
    <NavLink href="/dashboard">
      <Flex align="center" as={Link} gap="3" textTransform="uppercase">
        <Logo /> {es.common.appName}
      </Flex>
    </NavLink>

    <IconButton
      aria-expanded={isSidebarOpen}
      aria-label="Close Sidebar"
      display={{ lg: 'none' }}
      h={6}
      icon={<Icon icon="arrow-left" />}
      onClick={closeSidebar}
      textDecor="none"
      variant="link"
      w={6}
    />
  </Flex>
));

Header.displayName = 'Header';

export { Header };
