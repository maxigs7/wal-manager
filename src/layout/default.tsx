import React from 'react';

import { Flex } from '@chakra-ui/react';

const DefaultLayout: React.FC = ({ children }) => (
  <Flex
    align="center"
    as="section"
    bg="cello.500"
    justify="center"
    minH="100vh"
    p={5}
    textAlign="center"
  >
    {children}
  </Flex>
);

export default DefaultLayout;
