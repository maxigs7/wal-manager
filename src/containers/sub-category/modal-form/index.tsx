import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useCategoryById, useCategoryMutations } from '@api';
import { SubCategoryForm } from '@components';
import { useUser } from '@lib/supabase';
import { ModalForm } from '@lib/wal-ui';
import { Category } from '@models';

const SubCategoryModalForm: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss, parent }) => {
  const { user } = useUser();
  const { data: category, isLoading, refetch } = useCategoryById(id);
  const { create, update } = useCategoryMutations('sub-categories');
  const { data, isLoading: isSubmitting, isSuccess } = id ? update : create;

  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);
  const defValue: Partial<Category> = useMemo(
    () => ({
      color: parent.color,
      icon: parent.icon,
      parentId: parent.id,
      type: parent.type,
      userId: user?.id as string,
    }),
    [parent, user],
  );

  /// HANDLERS
  const onConfirm = (model: Category) => {
    if (isSubmitting) return;

    if (!id) {
      return create.mutate(model);
    }
    return update.mutate(model);
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
    if (isSuccess && data) {
      onConfirmed(data);
    }
  }, [data, isSuccess]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isLoading={isLoading}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      model={category}
      onClose={onDismiss}
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
  onConfirmed(category: Category): void;
  onDismiss(): void;
  parent: Category;
}

export { SubCategoryModalForm };
