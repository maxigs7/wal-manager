// import React, { useEffect, useMemo } from 'react';
// import { UseFormReturn } from 'react-hook-form';

// import { Category, useCategory } from '@app/api/categories';
// import { CategoryType } from '@app/api/common';
// import { CategoryForm } from '@app/components';
// import { useAuth } from '@lib/auth';
// import { ModalForm } from '@lib/wal-ui';

// const CategoryModalForm: React.FC<IProps> = ({ id, isOpen, onClose: onCloseModal, type }) => {
//   const { userId } = useAuth();
//   // const [{ data: category, isLoading }, dispatch] = useCategory();
//   const category = {};
//   const isLoading = true;
//   const dispatch = {
//     request: () => null,
//     save: () => null,
//   };

//   useEffect(() => {
//     if (id && dispatch) {
//       dispatch.request(id);
//     }
//   }, [id]);

//   const title = useMemo(() => (id ? 'Editar categoria' : 'Nueva categoria'), [id]);
//   const defValue = { categoryType: type, userId: userId as string };
//   const onConfirm = (model: Category) => {
//     if (!isLoading)
//       return dispatch.save(model, id).then(() => {
//         onCloseModal(id);
//       });
//   };

//   const onClose = () => {
//     onCloseModal();
//   };

//   const renderForm = (props: UseFormReturn<Category>) => {
//     return <CategoryForm {...props} category={category} />;
//   };

//   return (
//     <ModalForm<Category>
//       actionButtonIcon="save"
//       actionButtonText="Guardar"
//       defaultValue={defValue}
//       isOpen={isOpen}
//       model={category}
//       onClose={onClose}
//       onConfirm={onConfirm}
//       size="3xl"
//       title={title}
//     >
//       {renderForm}
//     </ModalForm>
//   );
// };

// interface IProps {
//   id?: string;
//   isOpen: boolean;
//   onClose(id?: string): void;
//   type: CategoryType;
// }

// export { CategoryModalForm };
export {};
