import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { SubCategoryModalFormContainer, useCategoryRowsRefresh } from '@m/category';
import { CategoryType } from '@models';

import { useCategoryNav } from '../hooks';

const CreatePage: React.FC = () => {
  const { parentId, type } = useParams();
  const { goIndex } = useCategoryNav();
  const refresh = useCategoryRowsRefresh();

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
      <SubCategoryModalFormContainer
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        parentId={parentId as string}
        type={type as CategoryType}
      />
    </>
  );
};

export { CreatePage };
