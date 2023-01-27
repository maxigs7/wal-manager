import React from 'react';

import { Flex } from '@chakra-ui/react';

import { SIDEBAR_WIDTH } from '../../constants';
import { Actions } from './actions';
import { User } from './user';

const Footer: React.FC = () => {
  return (
    <Flex
      bg="primary.500"
      bottom="0"
      direction="column"
      left="0"
      mt="auto"
      position="sticky"
      w={SIDEBAR_WIDTH}
    >
      <Actions />
      <User />
    </Flex>
  );
};

Footer.displayName = 'Footer';

export { Footer };
