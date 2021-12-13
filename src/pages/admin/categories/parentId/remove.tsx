import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Category, CategoryType, useCategorySubListRefresh } from '@entities';
import { CategoryDialogRemove } from '@features';
import { useRouter } from '@shared';

import { useCategoryNav } from '../hooks';

const RemovePage: React.FC = () => {
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
        <title>Eliminar Categoria - WAL</title>
      </Helmet>
      <CategoryDialogRemove id={id} isOpen={true} onConfirmed={onConfirmed} onDismiss={onDismiss} />
    </>
  );
};

export { RemovePage };
