import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Loader } from './loader';

const PageLoader: React.FC = () => (
  <Flex
    align="center"
    bg="white"
    justify="center"
    left="0"
    minH="100vh"
    minW="100vw"
    opacity="0.75"
    position="fixed"
    top="0"
  >
    <Loader />
  </Flex>
);

export { PageLoader };
