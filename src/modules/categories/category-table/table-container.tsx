'use client';

import React, { useCallback } from 'react';

import { es } from '@/i18n';
import { useModalManager } from '@/m/shared/modal-manager/provider';
import { ModalKey } from '@/m/shared/modal-manager/types';
import { Category } from '@/models';

import { CategoryRow } from '../models';
import { useCategorySelectRow } from '../query';
import { CategoryTable } from './table';

export type CategoryTableContainerProps = {
  data: Category[];
};

const CategoryTableContainer: React.FC<CategoryTableContainerProps> = ({ data }) => {
  const { data: categories, isLoading } = useCategorySelectRow(data);
  const { onOpen } = useModalManager();

  const onAdd = useCallback(
    (parent: CategoryRow) => {
      onOpen(
        ModalKey.SUBCATEGORY_CREATE,
        { title: es.category.pages.create.title },
        { parentId: parent.id },
      );
    },
    [onOpen],
  );

  const onMove = useCallback(
    (subcategory: CategoryRow) => {
      onOpen(
        ModalKey.SUBCATEGORY_MOVE,
        { title: es.category.pages.move.title },
        { id: subcategory.id },
      );
    },
    [onOpen],
  );

  const onRemove = useCallback(
    (category: CategoryRow) => {
      onOpen(
        ModalKey.CATEGORY_DELETE,
        { title: es.category.pages.remove.title },
        { id: category.id, name: category.name },
      );
    },
    [onOpen],
  );

  const onUpdate = useCallback(
    (category: CategoryRow) => {
      onOpen(
        category.parentId ? ModalKey.SUBCATEGORY_UPDATE : ModalKey.CATEGORY_UPDATE,
        { title: es.category.pages.update.title },
        { id: category.id },
      );
    },
    [onOpen],
  );

  return (
    <CategoryTable
      data={categories || []}
      isLoading={isLoading}
      onAdd={onAdd}
      onMove={onMove}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export { CategoryTableContainer };
