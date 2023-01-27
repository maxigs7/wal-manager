import NextLink from 'next/link';
import React from 'react';

import { Flex, IconButton, Link } from '@chakra-ui/react';

import { es } from '@/i18n';
import { Icon, Logo } from '@/shared';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

const Header: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => (
  <Flex align="center" justify="space-between" px="2" py="4" w="full">
    <Link
      alignItems="center"
      as={NextLink}
      display="flex"
      gap="3"
      href="/dashboard"
      textTransform="uppercase"
    >
      <Logo /> {es.common.appName}
    </Link>

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
