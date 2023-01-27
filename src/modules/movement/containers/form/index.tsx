import React, { useEffect } from 'react';

import { Flex, Skeleton } from '@chakra-ui/react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { ApiError } from '@/lib';
import { useUser } from '@/m/auth';
import { DEFAULT_MOVEMENT_TYPE, Movement, MovementType } from '@/models';

import { MovementForm as MovementFormComponent } from '../../components';
import { useMapMovementToForm, useMovementSelectById } from '../../hooks';
import { MovementForm } from '../../models';
import Actions from './actions';


interface IProps {
  accountId?: string;
  goBackUrl?: string;
  id?: string;
  month?: number;
  onSubmit: UseMutateAsyncFunction<Movement, ApiError, MovementForm>;
  onConfirmed(movement: Movement): void;
  year?: number;
}

const MovementFormContainer: React.FC<IProps> = ({
  accountId,
  goBackUrl,
  id,
  month,
  onConfirmed,
  onSubmit,
  year,
}) => {
  const { user } = useUser();
  const { data: [movement, fee] = [], isLoading } = useMovementSelectById(id);
  const mapper = useMapMovementToForm();

  const useFormProps = useForm<MovementForm>({
    defaultValues: {
      accountId,
      amountValue: undefined,
      categoryId: '',
      createAll: false,
      description: undefined,
      isPaid: false,
      month: month || new Date().getMonth(),
      type: DEFAULT_MOVEMENT_TYPE,
      userId: user?.id as string,
      year: year || new Date().getFullYear(),
    },
  });
  const {
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useFormProps;

  const onSubmitForm = handleSubmit((model) => {
    return onSubmit(model, {
      onSuccess: (movement) => onConfirmed(movement),
    });
  });

  useEffect(() => {
    if (movement) {
      const model = mapper(movement, fee);
      reset(model);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movement]);

  return (
    <Flex as="form" bg="white" direction={['column-reverse', 'column']} onSubmit={onSubmitForm}>
      <Actions goBackUrl={goBackUrl} isLoading={isSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <MovementFormComponent {...useFormProps} />
      </Skeleton>
    </Flex>
  );
};

export { MovementFormContainer };
