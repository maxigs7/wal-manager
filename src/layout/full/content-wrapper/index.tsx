'use client';

import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

import { NAVBAR_HEIGHT, SIDEBAR_WIDTH } from '../constants';
import { useLayout } from '../provider';

const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    sidebar: { isOpen },
  } = useLayout();
  return (
    <Flex
      direction="column"
      flex={1}
      overflowX="hidden"
      overflowY="auto"
      pl={{ lg: isOpen ? SIDEBAR_WIDTH : 0 }}
      pt={NAVBAR_HEIGHT}
    >
      {children}
    </Flex>
  );
};

export { ContentWrapper };
