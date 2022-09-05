import { Flex, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';

import { SIDEBAR_WIDTH, SIDEBAR_Z_INDEX } from '../constants';
import { useLayout } from '../provider';
import { Backdrop } from './backdrop';
import { Footer } from './footer';
import { Header } from './header';
import { Menu } from './menu';

const Sidebar: React.FC = React.memo(() => {
  const { closeSidebar, isSidebarOpen } = useLayout();
  const bg = useColorModeValue('cello.600', 'cello.800');

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
      <Flex
        bg={bg}
        color="white"
        direction="column"
        h="100%"
        id="sidebar"
        left={{ base: 0, lg: 'auto' }}
        overflowY="auto"
        pos={{ base: 'absolute', lg: 'static' }}
        top={{ base: 0, lg: 'auto' }}
        transition="transform 0.2s ease-in-out"
        w={SIDEBAR_WIDTH}
        transform={{
          base: isSidebarOpen ? 'translateX(0)' : 'translateX(-16rem)',
          lg: 'translateX(0)',
        }}
      >
        <Header closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
        <Menu closeSidebar={closeSidebar} />
        <Footer />
      </Flex>
    </Flex>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
