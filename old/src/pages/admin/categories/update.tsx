import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CategoryModalFormContainer, useCategoryRowsRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from './hooks';

const UpdatePage: React.FC = () => {
  const { id, type } = useParams();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRowsRefresh();

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
      <CategoryModalFormContainer
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
