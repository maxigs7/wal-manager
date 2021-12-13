import React from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import { Backdrop } from './backdrop';
import { Header } from './header';
import { Menu } from './menu';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
}

export const Sidebar: React.FC<IProps> = React.memo(({ closeSidebar, isSidebarOpen }) => (
  <Flex w={{ lg: '64' }}>
    {/* Sidebar backdrop (mobile only) */}
    <Backdrop closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />

    {/* Sidebar */}
    <VStack
      bg="cello.700"
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
      w="64"
      zIndex={40}
    >
      {/* Sidebar header */}
      <Header closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
      <Menu closeSidebar={closeSidebar} />
    </VStack>
  </Flex>
));
