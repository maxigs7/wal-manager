import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Category, useCategory } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { ModalForm } from '@app/modules/common';
import { useAuth } from '@lib/auth';

import { CategoryForm } from '../form';

const CategoryModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal, type }) => {
  const { userId } = useAuth();
  const [{ data: category, isLoading }, dispatch] = useCategory();

  useEffect(() => {
    if (id) {
      dispatch.request(id);
    }
  }, [id]);

  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);
  const defValue = { categoryType: type, userId: userId as string };
  const onConfirm = (model: Category) => {
    if (!isLoading)
      return dispatch.save(model, id).then(() => {
        onClose();
      });
  };

  const onClose = () => {
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<Category>) => {
    return <CategoryForm {...props} category={category} />;
  };

  return (
    <ModalForm<Category>
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
      isOpen={isOpen}
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
  onClose(): void;
  type: CategoryType;
}

export { CategoryModalForm };
