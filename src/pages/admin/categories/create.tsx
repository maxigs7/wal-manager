import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CategoryModalFormContainer, useCategoryRootListRefresh } from '@m/category';
import { CategoryType } from '@models';

import { useCategoryNav } from './hooks';

const CreatePage: React.FC = () => {
  const { type } = useParams();
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
      <CategoryModalFormContainer
        isOpen={true}
        onConfirmed={onConfirmed}
        onDismiss={onDismiss}
        type={type as CategoryType}
      />
    </>
  );
};

export { CreatePage };
