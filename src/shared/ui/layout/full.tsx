import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

interface IProps {
  closeSidebar(): void;
  isSidebarOpen: boolean;
  signOut(): Promise<void>;
  toggleSidebar(): void;
  userName: string;
  userPhotoUrl?: string;
}

const FullLayout: React.FC<IProps> = ({
  children,
  closeSidebar,
  isSidebarOpen,
  signOut,
  toggleSidebar,
  userName,
  userPhotoUrl,
}) => (
  <Flex minH="100vh" overflow="hidden">
    <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />
    <Flex
      bg="narvik.100"
      direction="column"
      flex={1}
      overflowX="hidden"
      overflowY="auto"
      pos="relative"
    >
      <Navbar
        signOut={signOut}
        toggleSidebar={toggleSidebar}
        userName={userName}
        userPhotoUrl={userPhotoUrl}
      />
      <Flex as="main" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8} w="full">
        {children}
      </Flex>
    </Flex>
  </Flex>
);

export default FullLayout;
