// import React, { useCallback, useEffect, useMemo } from 'react';
// import { useForm } from 'react-hook-form';

// import { useUser } from '@m/auth';
// import { TransactionForm, TransactionType } from '@models';
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
//   accountId?: string;
//   date?: Date;
//   id?: string;
//   isOpen: boolean;
//   onConfirmed(transaction: TransactionForm): void;
//   onDismiss(): void;
//   type: TransactionType;
// }

// const ModalForm: React.FC<IProps> = ({
//   accountId,
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
//       accountId,
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

//   const title = useMemo(() => (id ? 'Editar movimiento' : 'Nueva movimiento'), [id]);

//   useEffect(() => {
//     if (transaction) {
//       const model = mapper(transaction);
//       reset(model);
//     }
//   }, [transaction]);

//   return (
//     <ModalFormContainer isOpen={isOpen} onClose={onDismiss} onSubmit={onSubmit()} size="5xl">
//       <ModalFormHeader onClose={onDismiss}>{title}</ModalFormHeader>
//       <ModalFormBody isLoading={isLoading}>
//         <TransactionFormComponent
//           {...useFormProps}
//           accountId={accountId}
//           type={transaction?.type || type}
//         />
//       </ModalFormBody>
//       <ModalFormFooter>
//         <SubmitButton isSubmitting={isFormSubmitting || isSubmitting}>Guardar</SubmitButton>
//         <CancelButton onClick={onDismiss} />
//       </ModalFormFooter>
//     </ModalFormContainer>
//   );
// };

// export default ModalForm;
import { Box, Skeleton } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { TransactionForm, TransactionType } from '@models';

import { useTransactionGetById, useTransactionMapping, useTransactionUpsert } from '../../hooks';
import { TransactionForm as TransactionFormComponent } from '../form';
import Actions from './actions';

interface IProps {
  accountId?: string;
  date?: Date;
  id?: string;
  onConfirmed(transaction: TransactionForm): void;
  type?: TransactionType;
}

const TransactionFormContainer: React.FC<IProps> = ({ accountId, date, id, onConfirmed, type }) => {
  const { user } = useUser();
  const { data: transaction, isLoading } = useTransactionGetById(id);
  const mapper = useTransactionMapping(date || new Date());
  const { isLoading: isSubmitting, mutateAsync } = useTransactionUpsert();

  const useFormProps = useForm<TransactionForm>({
    defaultValues: {
      accountId,
      createAll: true,
      date,
      isPaid: false,
      isRecurring: false,
      type,
      userId: user?.id as string,
    },
  });
  const {
    formState: { isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: (transaction) => onConfirmed(transaction as TransactionForm),
    });
  });

  useEffect(() => {
    if (transaction) {
      const model = mapper(transaction);
      reset(model);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction]);

  return (
    <Box as="form" bg="white" onSubmit={onSubmit}>
      <Actions display={['none', 'flex']} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <TransactionFormComponent
          {...useFormProps}
          accountId={transaction?.accountId || accountId}
          type={(transaction?.type || type) as TransactionType}
        />
      </Skeleton>
      <Actions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { TransactionFormContainer };
