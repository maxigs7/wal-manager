import React from 'react';

import { Flex } from '@chakra-ui/react';

import { mainRoutes } from './data';
import { MenuItem } from './item';

export const Menu: React.FC = () => (
  <Flex
    align="stretch"
    direction="column"
    gap="1"
    justifyContent="flex-start"
    pt="3"
    px="3"
    w="full"
  >
    {mainRoutes.map((item, index) => (
      <MenuItem {...item} key={index} />
    ))}
  </Flex>
);
