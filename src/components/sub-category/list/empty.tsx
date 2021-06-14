import React from 'react';

import { Button, EmptyMessage } from '@app/modules/common';

import { SubCategoriesWrapper } from './wrapper';

interface Props {
  onCreate?: () => void;
}

const styles = {
  callToAction: '',
  message: 'text-2xl my-5',
  textMuted: 'text-gray-700',
  wrapper: 'p-5 h-96',
};

export const SubCategoriesEmpty: React.FC<Props> = React.memo(({ onCreate }) => (
  <SubCategoriesWrapper className={styles.wrapper}>
    <EmptyMessage className={styles.textMuted}>
      <p className={styles.message}>No existen sub-categorias</p>
      <Button className={styles.callToAction} onClick={onCreate}>
        Crea una sub-categoria
      </Button>
    </EmptyMessage>
  </SubCategoriesWrapper>
));
