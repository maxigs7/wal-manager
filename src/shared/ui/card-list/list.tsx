import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

const CardsList: React.FC<FlexProps> = ({ children, ...flexProps }) => (
  <Flex {...flexProps} flexWrap="wrap">
    {children}
  </Flex>
);

export default React.memo(CardsList);
