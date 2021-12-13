import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Category, CategoryType, useCategoryRootListRefresh } from '@entities';
import { CategoryModalForm } from '@features';
import { useRouter } from '@shared';

import { useCategoryNav } from './hooks';

const UpdatePage: React.FC = () => {
  const {
    params: { id, type },
  } = useRouter();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRootListRefresh();

  const onConfirmed = (category: Category) => {
    refresh(category.type, category.id);
    onDismiss();
  };

  const onDismiss = () => {
    goIndex(type as CategoryType);
  };

  return (
    <>
      <Helmet>
        <title>Actualizar Categoria - WAL</title>
      </Helmet>
      <CategoryModalForm
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        type={type as CategoryType}
      />
    </>
  );
};

export { UpdatePage };
