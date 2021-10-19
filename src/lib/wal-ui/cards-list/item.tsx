import React from 'react';

import { BoxProps } from '@chakra-ui/react';

import { Card } from '@lib/wal-ui';

const CardsListItem: React.FC<BoxProps> = ({ children, onClick, ...boxProps }) => (
  <Card h={64} mb={5} mr={5} onClick={onClick} p={5} w={64} {...boxProps}>
    {children}
  </Card>
);

export { CardsListItem };
