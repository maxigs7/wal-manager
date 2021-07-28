import React from 'react';

import { Flex, IconButton } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

import { useSidebar } from '../sidebar';
import { UserMenu } from './user-menu';

export const Navbar: React.FC = () => {
  const { toggle } = useSidebar();

  return (
    <Flex
      align="center"
      as="header"
      bg="white"
      boxShadow="md"
      h="16"
      justify="space-between"
      pos="sticky"
      px={{ base: 4, sm: 6, lg: 8 }}
      top="0"
      zIndex="10"
    >
      {/* Header: Left side */}
      <Flex align="center" h="full">
        {/* Hamburger button */}
        <IconButton
          aria-controls="sidebar"
          aria-label="Open Sidebar"
          display={{ lg: 'none' }}
          icon={<Icon fill="current" icon="bars" />}
          onClick={toggle}
          variant="ghost"
        />
      </Flex>
      {/* Header: Right side */}
      <Flex align="center" h="full">
        {/* <SearchModal />
            <Notifications />
            <Help /> */}
        {/*  Divider */}
        <UserMenu />
      </Flex>
    </Flex>
  );
};
