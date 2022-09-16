import { Box, Flex, Skeleton } from '@chakra-ui/react';
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
    <Flex as="form" bg="white" direction={['column-reverse', 'column']} onSubmit={onSubmit}>
      <Actions date={useFormProps.getValues('date')} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <TransactionFormComponent
          {...useFormProps}
          accountId={transaction?.accountId || accountId}
          type={(transaction?.type || type) as TransactionType}
        />
      </Skeleton>
    </Flex>
  );
};

export { TransactionFormContainer };
