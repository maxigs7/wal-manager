import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { EmptyMessage } from '@app/modules/common';

import { ListWrapper } from '../list-wrapper';

interface Props {
  onCreate?: () => void;
}

const styles = {
  callToAction: '',
  message: 'text-2xl my-3',
  wrapper: 'p-5',
};

export const ListEmpty: React.FC<Props> = ({ onCreate }) => (
  <ListWrapper className={styles.wrapper}>
    <EmptyMessage>
      <Text className={styles.message}>No se encuentran sub categorias</Text>
      <Button className={styles.callToAction} onClick={onCreate}>
        Crea una sub categoria
      </Button>
    </EmptyMessage>
  </ListWrapper>
);
