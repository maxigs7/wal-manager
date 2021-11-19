import React from 'react';
import { Outlet } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { Navbar } from './navbar';
import { Sidebar, SidebarProvider } from './sidebar';

const AdminLayout: React.FC = () => (
  <SidebarProvider>
    <Flex minH="100vh" overflow="hidden">
      <Sidebar />
      <Flex
        bg="narvik.100"
        direction="column"
        flex={1}
        overflowX="hidden"
        overflowY="auto"
        pos="relative"
      >
        <Navbar />
        <Flex as="main" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8} w="full">
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  </SidebarProvider>
);

export default AdminLayout;
