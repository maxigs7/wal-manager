import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { EmptyMessage } from '@app/modules/common';

const CategoryListEmpty: React.FC<IProps> = ({ onCreated }) => (
  <EmptyMessage color="gray.400">
    <Text my={5} size="2xl">
      No existen categorias
    </Text>
    {onCreated && (
      <Button colorScheme="blue" onClick={onCreated}>
        Crea una categoria
      </Button>
    )}
  </EmptyMessage>
);

interface IProps {
  onCreated?: () => void;
}

export { CategoryListEmpty };
