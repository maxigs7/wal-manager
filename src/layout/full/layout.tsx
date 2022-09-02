import { Flex, ScaleFade } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';

import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

interface IProps extends PropsWithChildren {
  closeSidebar(): void;
  isSidebarOpen: boolean;
  toggleSidebar(): void;
}

const FullLayout: React.FC<IProps> = ({ children, closeSidebar, isSidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  return (
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
        <Navbar toggleSidebar={toggleSidebar} />
        <ScaleFade key={router.route} in={true} initialScale={0.9}>
          <Flex as="main" mx="auto" w="full">
            {children}
          </Flex>
        </ScaleFade>
      </Flex>
    </Flex>
  );
};

export default FullLayout;
