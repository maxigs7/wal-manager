import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { ColorModeToggle, Icon } from '@shared';

import { NAVBAR_HEIGHT, NAVBAR_Z_INDEX, SIDEBAR_WIDTH } from '../constants';

interface IProps {
  toggleSidebar(): void;
}

export const Navbar: React.FC<IProps> = ({ toggleSidebar }) => {
  const bg = useColorModeValue('white', 'cello.700');
  return (
    <Flex
      align="center"
      as="header"
      bg={bg}
      boxShadow="md"
      h={NAVBAR_HEIGHT}
      justify="space-between"
      left={{ base: 0, lg: SIDEBAR_WIDTH }}
      position="fixed"
      px={{ base: 4, sm: 6, lg: 8 }}
      right="0"
      top="0"
      zIndex={NAVBAR_Z_INDEX}
    >
      {/* Header: Left side */}
      <Flex align="center" h="full">
        {/* Hamburger button */}
        <IconButton
          aria-controls="sidebar"
          aria-label="Open Sidebar"
          display={{ lg: 'none' }}
          icon={<Icon fill="current" icon="bars" />}
          onClick={toggleSidebar}
          variant="ghost"
        />
      </Flex>
      {/* Header: Right side */}
      <Flex align="center" h="full">
        <ColorModeToggle />
      </Flex>
    </Flex>
  );
};
