import React from 'react';

import { Flex } from '@chakra-ui/react';

import { Icon } from '@lib/chakra-ui';

const AccountNewPlaceholder: React.FC<IProps> = ({ onSelected }) => (
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
    mb={5}
    onClick={onSelected}
    p={5}
    textTransform="uppercase"
    w={['full', 64]}
  >
    <Icon icon="plus" mb={3} size="3x" />
    Añadir Cuenta
  </Flex>
);

interface IProps {
  onSelected?(): void;
}

export { AccountNewPlaceholder };
