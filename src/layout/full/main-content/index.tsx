import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex as="main" flexDirection="column" h="full" mx="auto" w="full">
      {children}
    </Flex>
  );
};

export { MainContent };
