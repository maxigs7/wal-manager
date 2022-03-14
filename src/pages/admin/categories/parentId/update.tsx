import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from '@lib';
import { SubCategoryModalFormContainer, useCategorySubListRefresh } from '@m/category';
import { Category, CategoryType } from '@models';

import { useCategoryNav } from '../hooks';

const UpdatePage: React.FC = () => {
  const {
    params: { id, parentId, type },
  } = useRouter();
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
