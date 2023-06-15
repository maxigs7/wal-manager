'use client';
import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import { NAVBAR_Z_INDEX, SIDEBAR_WIDTH } from '../constants';
import { useLayout } from '../provider';

export const NavbarWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    sidebar: { isOpen },
  } = useLayout();

  return (
    <Flex
      align="center"
      as="header"
      left={{ base: 0, lg: isOpen ? SIDEBAR_WIDTH : 0 }}
      position="fixed"
      pt="2"
      px="3"
      right="0"
      top="0"
      zIndex={NAVBAR_Z_INDEX}
    >
      {children}
    </Flex>
  );
};
