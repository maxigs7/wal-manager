import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

const CardPlaceholder: React.FC<FlexProps> = ({ children, onClick }) => (
  <Flex
    _hover={{ cursor: 'pointer' }}
    alignItems="center"
    backgroundImage={`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='5' ry='5' stroke='gray' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`}
    borderRadius="md"
    borderStyle="dashed"
    color="gray"
    flexDir="column"
    h={64}
    justifyContent="center"
    onClick={onClick}
    textTransform="uppercase"
    w={['full', 64]}
  >
    {children}
  </Flex>
);

export default CardPlaceholder;
