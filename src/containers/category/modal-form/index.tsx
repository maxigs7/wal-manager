import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Category } from '@app/api/categories';
import { CategoryForm } from '@app/components';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectUserId } from '@app/stores/auth';
import {
  CATEGORIES_REQUEST_REFRESH,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_REQUEST,
  CATEGORY_RESET,
  CATEGORY_UPDATE_REQUEST,
  selectSelectedType,
} from '@app/stores/categories';
import { ModalForm } from '@lib/wal-ui';

const CategoryModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal }) => {
  const dispatch = useAppDispatch();

  /// SELECTORS
  const userId = useAppSelector(selectUserId);
  const type = useAppSelector(selectSelectedType);
  const { data: category } = useAppSelector((state) => state.categories.category);
  const {
    data: idSaved,
    isLoading: isSubmitting,
    status,
  } = useAppSelector((state) => state.categories.categoryAction);

  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);

  const defValue: Partial<Category> = useMemo(
    () => ({ categoryType: type, userId: userId as string, parentId: null }),
    [type, userId],
  );

  /// HANDLERS
  const onConfirm = (model: Category) => {
    if (isSubmitting) return;

    if (!id) {
      return dispatch(CATEGORY_CREATE_REQUEST(model));
    }

    return dispatch(CATEGORY_UPDATE_REQUEST(model));
  };

  const onClose = () => {
    dispatch(CATEGORY_RESET());
    onCloseModal();
  };

  const renderForm = (props: UseFormReturn<Category>) => {
    return <CategoryForm {...props} category={category} />;
  };

  /// EFFECTS
  useEffect(() => {
    if (id) {
      dispatch(CATEGORY_REQUEST(id));
    }
  }, [id]);

  useEffect(() => {
    if (status === 'success') {
      dispatch(CATEGORIES_REQUEST_REFRESH(idSaved));
      dispatch(CATEGORY_RESET());
      onCloseModal(idSaved);
    }
  }, [status]);

  return (
    <ModalForm
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={defValue}
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
}

export { CategoryModalForm };
