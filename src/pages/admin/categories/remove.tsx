import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from '@lib';
import { CategoryDialogRemoveContainer, useCategoryRootListRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from './hooks';

const RemovePage: React.FC = () => {
  const {
    params: { id, type },
  } = useRouter();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRootListRefresh();

  const onConfirmed = (category: Category) => {
    refresh(type as CategoryType, category.id);
    onDismiss();
  };

  const onDismiss = () => {
    goIndex(type as CategoryType);
  };

  return (
    <>
      <Helmet>
        <title>Eliminar Categoria - WAL</title>
      </Helmet>
      <CategoryDialogRemoveContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
      />
    </>
  );
};

export { RemovePage };
