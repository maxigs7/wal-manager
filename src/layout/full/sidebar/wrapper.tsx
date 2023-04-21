'use client';
import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import { SIDEBAR_WIDTH, SIDEBAR_Z_INDEX } from '../constants';

const SidebarWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      bottom="0"
      left="0"
      position="fixed"
      top="0"
      w={{ lg: SIDEBAR_WIDTH }}
      zIndex={{ base: SIDEBAR_Z_INDEX, lg: 'auto' }}
    >
      {children}
    </Flex>
  );
};

export { SidebarWrapper };
