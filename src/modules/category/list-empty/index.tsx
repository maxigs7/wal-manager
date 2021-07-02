import React from 'react';

import { FillButton, EmptyMessage, Text } from '@app/modules/common';

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
      <FillButton className={styles.callToAction} onClick={onCreate}>
        Crea una categoria
      </FillButton>
    </EmptyMessage>
  </ListWrapper>
);
