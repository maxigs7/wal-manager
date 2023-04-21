import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex minH="100vh" overflow="hidden">
      {children}
    </Flex>
  );
};

export { Wrapper };
