'use client';
import React, { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { NAVBAR_HEIGHT, NAVBAR_Z_INDEX, SIDEBAR_WIDTH } from '../constants';

export const NavbarWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const bg = useColorModeValue('white', 'primary.700');
  return (
    <Flex
      align="center"
      as="header"
      bg={bg}
      boxShadow="md"
      h={NAVBAR_HEIGHT}
      left={{ base: 0, lg: SIDEBAR_WIDTH }}
      position="fixed"
      px={{ base: 4, sm: 6, lg: 8 }}
      right="0"
      top="0"
      zIndex={NAVBAR_Z_INDEX}
    >
      {children}
    </Flex>
  );
};
