import { Flex, ScaleFade } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';

import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

const FullLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  return (
    <Flex minH="100vh" overflow="hidden">
      <Sidebar />
      <Flex
        direction="column"
        flex={1}
        overflowX="hidden"
        overflowY="auto"
        pl={{ lg: SIDEBAR_WIDTH }}
        pt={NAVBAR_HEIGHT}
      >
        <Navbar />
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
