import React from 'react';

import { Text } from '@chakra-ui/react';

import { EmptyMessage } from '@app/modules/common';

import { ListWrapper } from '../list-wrapper';

interface Props {
  onCreate?: () => void;
}

const styles = {
  callToAction: '',
  message: 'text-2xl mt-3',
  wrapper: 'p-5 h-full',
};

export const ListNoSelected: React.FC<Props> = () => (
  <ListWrapper className={styles.wrapper}>
    <EmptyMessage icon="tags">
      <Text className={styles.message}>Seleccione una categoria</Text>
    </EmptyMessage>
  </ListWrapper>
);
