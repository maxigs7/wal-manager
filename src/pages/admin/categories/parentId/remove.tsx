import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CategoryDialogRemoveContainer, useCategorySubListRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from '../hooks';

const RemovePage: React.FC = () => {
  const { id, parentId, type } = useParams();
  const { goIndex } = useCategoryNav();
  const refresh = useCategorySubListRefresh();

  const onConfirmed = (category: Category) => {
    refresh(parentId as string, category.id);
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
