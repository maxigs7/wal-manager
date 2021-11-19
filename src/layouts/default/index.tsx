import React from 'react';
import { Outlet } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

const DefaultLayout: React.FC = () => (
  <Flex
    align="center"
    as="section"
    bg="cello.500"
    justify="center"
    minH="100vh"
    p={5}
    textAlign="center"
  >
    <Outlet />
  </Flex>
);

export default DefaultLayout;
