import { Box, Skeleton } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { CreditCard, DEFAULT_CREDIT_CARD_TYPE } from '@models';

import { CreditCardForm } from '../../components';
import { useCreditCardCreate, useCreditCardGetById, useCreditCardUpdate } from '../../hooks';
import Actions from './actions';

interface IProps {
  id?: string;
  onConfirmed(creditCard: CreditCard): void;
}

const CreditCardFormContainer: React.FC<IProps> = ({ id, onConfirmed }) => {
  const { user } = useUser();
  const create = useCreditCardCreate();
  const update = useCreditCardUpdate();
  const { data: creditCard, isLoading } = useCreditCardGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<CreditCard>({
    defaultValues: { userId: user?.id as string, type: DEFAULT_CREDIT_CARD_TYPE },
  });
  const {
    formState: { isSubmitting: isFormSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const onSubmit = handleSubmit((model) => {
    return mutateAsync(model, {
      onSuccess: onConfirmed,
    });
  });

  useEffect(() => {
    if (creditCard) {
      reset(creditCard);
    }
  }, [creditCard, reset]);

  return (
    <Box as="form" bg="white" onSubmit={onSubmit}>
      <Actions display={['none', 'flex']} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <CreditCardForm {...useFormProps} id={id} />
      </Skeleton>
      <Actions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { CreditCardFormContainer };
