import React, { PropsWithChildren } from 'react';

import { Heading } from '@chakra-ui/react';

export const Title: React.FC<PropsWithChildren> = ({ children }) => (
  <Heading
    as="h6"
    color="gray.200"
    fontSize="x-small"
    fontWeight="semibold"
    my="2"
    textTransform="uppercase"
  >
    {children}
  </Heading>
);
