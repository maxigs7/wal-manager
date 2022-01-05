import React from 'react';

import { Flex, useColorModeValue, VStack } from '@chakra-ui/react';

import { SIDEBAR_WIDTH, SIDEBAR_Z_INDEX } from '../constants';
import { Backdrop } from './backdrop';
import { Header } from './header';
import { Menu } from './menu';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => {
  const bg = useColorModeValue('primary.700', 'primary.900');

  return (
    <Flex
      bottom="0"
      left="0"
      position="fixed"
      top="0"
      w={{ lg: SIDEBAR_WIDTH }}
      zIndex={SIDEBAR_Z_INDEX}
    >
      {/* Sidebar backdrop (mobile only) */}
      <Backdrop closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Sidebar */}
      <VStack
        bg={bg}
        color="white"
        h="100%"
        id="sidebar"
        left={{ base: 0, lg: 'auto' }}
        overflowY="auto"
        pos={{ base: 'absolute', lg: 'static' }}
        top={{ base: 0, lg: 'auto' }}
        transform={{
          base: isSidebarOpen ? 'translateX(0)' : 'translateX(-16rem)',
          lg: 'translateX(0)',
        }}
        transition="transform 0.2s ease-in-out"
        w={SIDEBAR_WIDTH}
      >
        {/* Sidebar header */}
        <Header closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
        <Menu closeSidebar={closeSidebar} />
      </VStack>
    </Flex>
  );
});
