import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { EmptyMessage } from '@app/modules/common';

const SubCategoryListEmpty: React.FC<IProps> = React.memo(({ onCreated }) => (
  <EmptyMessage color="gray.400">
    <Text my={5} size="2xl">
      No existen sub categorias
    </Text>
    {onCreated && (
      <Button colorScheme="crimson" onClick={onCreated}>
        Crea una sub categoria
      </Button>
    )}
  </EmptyMessage>
));

interface IProps {
  onCreated?(): void;
}

export { SubCategoryListEmpty };
