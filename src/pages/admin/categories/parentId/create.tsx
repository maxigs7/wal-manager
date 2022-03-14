import React from 'react';
import { Helmet } from 'react-helmet-async';

import { useRouter } from '@lib';
import { SubCategoryModalFormContainer, useCategorySubListRefresh } from '@m/category';
import { CategoryType } from '@models';

import { useCategoryNav } from '../hooks';

const CreatePage: React.FC = () => {
  const {
    params: { parentId, type },
  } = useRouter();
  const { goIndex } = useCategoryNav();
  const refresh = useCategorySubListRefresh();

  const onConfirmed = () => {
    refresh(parentId as string);
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
