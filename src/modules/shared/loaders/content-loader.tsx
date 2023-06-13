import React from 'react';

import { Flex, SpinnerProps } from '@chakra-ui/react';

import { Loader } from './loader';

const ContentLoader: React.FC<SpinnerProps> = (props) => (
  <Flex align="center" justify="center" p="5">
    <Loader {...props} />
  </Flex>
);

export { ContentLoader };
