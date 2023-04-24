'use client';

import React, { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

export const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const bg = useColorModeValue('white', 'primary.800');
  return (
    <Flex
      bg={bg}
      direction="column"
      flexBasis="full"
      ml={{ base: '2', lg: '0' }}
      mr="2"
      my="2"
      rounded="md"
      shadow="md"
    >
      {children}
    </Flex>
  );
};
