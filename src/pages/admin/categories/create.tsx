import React from 'react';
import { Helmet } from 'react-helmet-async';

import { CategoryType, useCategoryRootListRefresh } from '@entities';
import { CategoryModalForm } from '@features';
import { useRouter } from '@shared';

import { useCategoryNav } from './hooks';

const CreatePage: React.FC = () => {
  const {
    params: { type },
  } = useRouter();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRootListRefresh();

  const onConfirmed = () => {
    refresh(type as CategoryType);
    onDismiss();
  };

  const onDismiss = () => {
    goIndex(type as CategoryType);
  };

  return (
    <>
      <Helmet>
        <title>Crear Categoria - WAL</title>
      </Helmet>
      <CategoryModalForm
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        type={type as CategoryType}
      />
    </>
  );
};

export { CreatePage };
