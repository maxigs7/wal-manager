import React, { PropsWithChildren } from 'react';

import { Flex } from '@chakra-ui/react';

export const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex direction="column" flexBasis="full" ml={{ base: '2', lg: '0' }} mr="2" my="2">
      {children}
    </Flex>
  );
};
