import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

const CardsList: React.FC<FlexProps> = ({ children, ...flexProps }) => {
  return (
    <Flex {...flexProps} flexWrap="wrap">
      {children}
    </Flex>
  );
};

export { CardsList };
