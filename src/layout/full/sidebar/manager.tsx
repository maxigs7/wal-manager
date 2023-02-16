'use client';

import React, { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { SIDEBAR_WIDTH } from '../constants';
import { useLayout } from '../provider';

const SidebarManager: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSidebarOpen } = useLayout();
  const bg = useColorModeValue('primary.600', 'primary.800');

  return (
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
      {children}
    </Flex>
  );
};

export { SidebarManager };
