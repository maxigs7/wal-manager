// import React, { useEffect } from 'react';

// import { Category } from '@models';
// import { DialogRemove } from '@shared';

// import { useCategoryRemove } from '../../hooks';

// const CategoryDialogRemove: React.FC<IProps> = ({ id, isOpen, onConfirmed, onDismiss }) => {
//   const { data, isLoading, isSuccess, mutate } = useCategoryRemove();

//   const onConfirm = () => {
//     id && mutate(id);
//   };

//   useEffect(() => {
//     if (isSuccess && data) {
//       onConfirmed(data);
//     }
//   }, [data, isSuccess]);

//   return (
//     <DialogRemove
//       isLoading={isLoading}
//       isOpen={isOpen}
//       onClose={onDismiss}
//       onConfirm={onConfirm}
//       title="Eliminar Categoria"
//     />
//   );
// };

// interface IProps {
//   id?: string;
//   isOpen: boolean;
//   onConfirmed(data: Category): void;
//   onDismiss(): void;
// }

// export default CategoryDialogRemove;
import React, { useEffect } from 'react';

import { es } from '@i18n';
import { CategoryType } from '@models';
import { DialogRemove } from '@shared';

import { useCategoryRowsRefresh, useCategoryRemove } from '../../hooks';

interface IProps {
  id?: string;
  isOpen: boolean;
  onDismiss(): void;
  type: CategoryType;
}

const CategoryDialogRemove: React.FC<IProps> = ({ id, isOpen, onDismiss, type }) => {
  const { data, isLoading, isSuccess, mutate, reset } = useCategoryRemove();
  const refresh = useCategoryRowsRefresh();

  const onConfirm = () => {
    id && mutate(id);
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset();
      refresh(type, data.id);
      onDismiss();
    }
  }, [data, isSuccess, onDismiss, refresh, reset, type]);

  return (
    <DialogRemove
      isLoading={isLoading}
      isOpen={isOpen}
      onClose={onDismiss}
      onConfirm={onConfirm}
      title={es.category.pages.remove.title}
    />
  );
};

export { CategoryDialogRemove };
