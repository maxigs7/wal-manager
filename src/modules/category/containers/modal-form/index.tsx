import React, { useCallback, useMemo } from 'react';

import { Category } from '@app/api/categories';
import { CategoryType } from '@app/api/common';
import { ModalForm } from '@app/modules/common';
import { useAuth } from '@lib/auth';

const LazyForm = React.lazy(
  () => import(/* webpackChunkName: 'category.form' */ '@app/modules/category/containers/form'),
);

const CategoryModalForm: React.FC<IProps> = ({ id, isOpen, onClose, type }) => {
  const { userId } = useAuth();
  const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);
  const onConfirm = useCallback(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted');
        resolve('WOOOAAHH');
      }, 3000);
    });
  }, []);

  return (
    <ModalForm<Category>
      actionButtonIcon="save"
      actionButtonText="Guardar"
      defaultValue={{ categoryType: type, userId: userId as string }}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      size="3xl"
      title={title}
    >
      {(props) => <LazyForm {...props} />}
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
