import React, { PropsWithChildren } from 'react';

import { Box, Flex, ScaleFade } from '@chakra-ui/react';

import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from './constants';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

const FullLayout: React.FC<PropsWithChildren> = ({ children }) => {
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
        <Box as={ScaleFade} h="full" in={true} initialScale={0.9}>
          <Flex as="main" h="full" mx="auto" w="full">
            {children}
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default FullLayout;
