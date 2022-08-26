import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { SubCategoryModalFormContainer, useCategoryRowsRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from '../hooks';

const UpdatePage: React.FC = () => {
  const { id, parentId, type } = useParams();
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
        <title>Actualizar Categoria - WAL</title>
      </Helmet>
      <SubCategoryModalFormContainer
        id={id}
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        parentId={parentId as string}
        type={type as CategoryType}
      />
    </>
  );
};

export { UpdatePage };
