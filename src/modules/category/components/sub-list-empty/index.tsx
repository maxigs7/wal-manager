import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { EmptyMessage } from '@shared';

interface IProps {
  onCreated?(): void;
}

const EmptyList: React.FC<IProps> = React.memo(({ onCreated }) => (
  <EmptyMessage color="gray.400">
    <Text my={5} size="2xl">
      No existen sub categorias
    </Text>
    {onCreated && (
      <Button colorScheme="info" onClick={() => onCreated()}>
        Crear una sub categoria
      </Button>
    )}
  </EmptyMessage>
));

export default EmptyList;
