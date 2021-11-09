import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useCategoryById, useCategoryMutations } from '@api';
import { SubCategoryForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { Category } from '@models';
import { CategoryType } from '@models/common';

const SubCategoryModalForm: React.FC<IProps> = ({
  id,
  isOpen,
  parentId,
  onClose: onCloseModal,
  type,
}) => {
  const { user } = useUser();
  const { data: category, isLoading, refetch } = useCategoryById(id);
  const { create, update } = useCategoryMutations();
  const { isLoading: isSubmitting, isSuccess } = id ? update : create;

  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);
  const defValue: Partial<Category> = useMemo(
    () => ({
      parentId,
      type,
      userId: user?.id as string,
    }),
    [parentId, type, user],
  );

  /// HANDLERS
  const onConfirm = (model: Category) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutate(model);
    }
    return update.mutate(model);
  };

  const onClose = () => {
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<Category>) => {
    return <SubCategoryForm {...props} category={category} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      onCloseModal();
    }
  }, [isSuccess]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={category}
      onClose={onClose}
      onConfirm={onConfirm}
      size="3xl"
      title={title}
    >
      {renderForm}
    </ModalForm>
  );
};

interface IProps {
  id?: string;
  isOpen: boolean;
  onClose(id?: string): void;
  parentId: string;
  type: CategoryType;
}

export { SubCategoryModalForm };
