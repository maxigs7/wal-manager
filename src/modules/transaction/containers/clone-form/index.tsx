// import React, { useCallback, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// import { useUser } from '@m/auth';
// import { TransactionType, TransactionForm } from '@models';
// import {
//   CancelButton,
//   ModalFormBody,
//   ModalFormContainer,
//   ModalFormFooter,
//   ModalFormHeader,
//   SubmitButton,
// } from '@shared';

// import { useTransactionGetById, useTransactionMapping, useTransactionUpsert } from '../../hooks';
// import TransactionFormComponent from '../form';

// interface IProps {
//   date?: Date;
//   id?: string;
//   isOpen: boolean;
//   onConfirmed(transaction: TransactionForm): void;
//   onDismiss(): void;
//   type: TransactionType;
// }

// const CloneForm: React.FC<IProps> = ({
//   date = new Date(),
//   id,
//   isOpen,
//   onConfirmed,
//   onDismiss,
//   type,
// }) => {
//   const { user } = useUser();
//   const { data: transaction, isLoading } = useTransactionGetById(id);
//   const mapper = useTransactionMapping(date);
//   const { isLoading: isSubmitting, mutateAsync } = useTransactionUpsert();

//   const useFormProps = useForm<TransactionForm>({
//     defaultValues: {
//       createAll: true,
//       date,
//       isPaid: false,
//       isRecurring: false,
//       type,
//       userId: user?.id as string,
//     },
//   });
//   const {
//     formState: { isSubmitting: isFormSubmitting },
//     handleSubmit,
//     reset,
//   } = useFormProps;

//   const onSubmit = useCallback(
//     () =>
//       handleSubmit((model) => {
//         return mutateAsync(model, {
//           onSuccess: (transaction) => onConfirmed(transaction as TransactionForm),
//         });
//       }),
//     [mutateAsync, onConfirmed],
//   );

//   useEffect(() => {
//     if (transaction) {
//       const model = mapper(transaction);
//       reset({ ...model, id: undefined });
//     }
//   }, [transaction]);

//   return (
//     <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit()} size="5xl">
//       <ModalFormHeader onClose={onDismiss}>Clonar Movimiento</ModalFormHeader>
//       <ModalFormBody isLoading={isLoading}>
//         <TransactionFormComponent {...useFormProps} type={transaction?.type || type} />
//       </ModalFormBody>
//       <ModalFormFooter>
//         <SubmitButton isSubmitting={isFormSubmitting || isSubmitting}>Clonar</SubmitButton>
//         <CancelButton onClick={onDismiss} />
//       </ModalFormFooter>
//     </ModalFormContainer>
//   );
// };

// export default CloneForm;
export {};
