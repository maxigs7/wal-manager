'use client';
import { PropsWithChildren } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

export const MenuContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const bg = useColorModeValue('primary.100', 'primary.800');

  return (
    <Flex
      align={{ base: 'center', lg: 'flex-start' }}
      basis={{ lg: '250px' }}
      bg={{ base: bg, lg: 'transparent' }}
      direction={{ lg: 'column' }}
      gap="1"
      mx="2"
      my={{ lg: '2' }}
      overflowX={{ base: 'auto', lg: 'hidden' }}
      overflowY={{ base: 'hidden' }}
      rounded={{ base: 'md', lg: 'none' }}
    >
      {children}
    </Flex>
  );
};
