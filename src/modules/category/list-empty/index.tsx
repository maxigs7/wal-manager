import React from 'react';

import { Button, Text } from '@chakra-ui/react';

import { EmptyMessage } from '@app/modules/common';

import { ListWrapper } from '../list-wrapper';

interface Props {
  onCreate?: () => void;
}

const styles = {
  callToAction: '',
  message: 'text-2xl my-5',
  textMuted: 'text-gray-400',
  wrapper: 'p-5 h-96',
};

export const ListEmpty: React.FC<Props> = ({ onCreate }) => (
  <ListWrapper className={styles.wrapper}>
    <EmptyMessage className={styles.textMuted}>
      <Text className={styles.message}>No existen categorias</Text>
      <Button className={styles.callToAction} onClick={onCreate}>
        Crea una categoria
      </Button>
    </EmptyMessage>
  </ListWrapper>
);
