'use client';
import React, { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { NAVBAR_HEIGHT } from '../../constants';

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const borderColor = useColorModeValue('gray.300', 'primary.700');
  return (
    <Flex
      align="center"
      borderBottom="1px"
      borderBottomColor={borderColor}
      justify={{ base: 'space-between', lg: 'center' }}
      minH={NAVBAR_HEIGHT}
      px="3"
    >
      {children}
    </Flex>
  );
};
