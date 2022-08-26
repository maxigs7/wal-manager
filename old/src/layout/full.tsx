import React from 'react';

import { Flex } from '@chakra-ui/react';

import { PagePortalsProvider } from '@shared';

import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from './constants';
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
      direction="column"
      flex={1}
      overflowX="hidden"
      overflowY="auto"
      pl={{ lg: SIDEBAR_WIDTH }}
      pt={NAVBAR_HEIGHT}
    >
      <Navbar
        signOut={signOut}
        toggleSidebar={toggleSidebar}
        userName={userName}
        userPhotoUrl={userPhotoUrl}
      />
      <PagePortalsProvider>
        <Flex as="main" mx="auto" w="full">
          {children}
        </Flex>
      </PagePortalsProvider>
    </Flex>
  </Flex>
);

export default FullLayout;
