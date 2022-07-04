import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CategoryDialogRemoveContainer, useCategoryRowsRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from './hooks';

const RemovePage: React.FC = () => {
  const { id, type } = useParams();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRowsRefresh();

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
