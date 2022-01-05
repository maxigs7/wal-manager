import React from 'react';

import { BoxProps } from '@chakra-ui/react';

import { Card } from '@shared';

const CardItem: React.FC<BoxProps> = React.memo(
  ({ children, onClick, mb = 5, h = 64, mr = 5, p = 5, w = 64, ...boxProps }) => (
    <Card {...boxProps} h={h} mb={mb} mr={mr} onClick={onClick} p={p} w={w}>
      {children}
    </Card>
  ),
);

export default CardItem;
