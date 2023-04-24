import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <Flex
    align="center"
    bg="primary.900"
    justify="center"
    minH="100vh"
    py={[null, null, '5']}
    w="full"
  >
    <Flex
      bg="white"
      direction="column"
      minW={{ base: 'full', md: 'xl' }}
      px={{ base: '5' }}
      py="3"
      rounded={[null, null, 'xl']}
      shadow="xl"
    >
      {children}
    </Flex>
  </Flex>
);
