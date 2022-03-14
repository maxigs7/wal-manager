import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

const CardList: React.FC<FlexProps> = React.memo(({ children, ...flexProps }) => (
  <Flex {...flexProps} flexWrap="wrap">
    {children}
  </Flex>
));

export default CardList;
