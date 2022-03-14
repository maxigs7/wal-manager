import React from 'react';
import { NavLink } from 'react-router-dom';

import { Flex, Heading, IconButton } from '@chakra-ui/react';

import { Icon } from '@shared';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => (
  <Flex align="center" justify="space-between" p={4} w="full">
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
    <Heading as={NavLink} flex="1" size="md" textAlign={{ lg: 'center' }} to="/" end>
      Wal Manager
    </Heading>
  </Flex>
));
