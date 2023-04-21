'use client';
import React, { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { NAVBAR_HEIGHT, NAVBAR_Z_INDEX, SIDEBAR_WIDTH } from '../constants';
import { useLayout } from '../provider';

export const NavbarWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const bg = useColorModeValue('white', 'primary.700');
  const {
    sidebar: { isOpen },
  } = useLayout();

  return (
    <Flex
      align="center"
      as="header"
      bg={bg}
      boxShadow="md"
      h={NAVBAR_HEIGHT}
      left={{ base: 0, lg: isOpen ? SIDEBAR_WIDTH : 0 }}
      position="fixed"
      px={{ base: 2, sm: 4, lg: 6 }}
      right="0"
      top="0"
      zIndex={NAVBAR_Z_INDEX}
    >
      {children}
    </Flex>
  );
};
