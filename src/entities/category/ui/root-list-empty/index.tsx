import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { CategoryType } from '@entities';
import { EmptyMessage } from '@shared';

interface IProps {
  onCreated?(): void;
  type: CategoryType;
}

const EmptyList: React.FC<IProps> = React.memo(({ onCreated, type }) => (
  <EmptyMessage color="gray.400">
    <Text my={5} size="2xl">
      No existen categorias
    </Text>
    {onCreated && (
      <Button
        colorScheme={type === CategoryType.Expense ? 'red' : 'green'}
        onClick={() => onCreated()}
      >
        Crear una categoria de {type === CategoryType.Expense ? 'gasto' : 'ingreso'}
      </Button>
    )}
  </EmptyMessage>
));

export default EmptyList;