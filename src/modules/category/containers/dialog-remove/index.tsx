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
export {};
