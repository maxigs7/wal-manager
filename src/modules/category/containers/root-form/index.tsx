import React, { useEffect } from 'react';

import { Box, Skeleton } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUser } from '@/m/auth';
import { Category, CategoryInsert } from '@/models';

import { FormActions, RootCategoryForm } from '../../components';
import { useCategoryCreate, useCategorySelectById, useCategoryUpdate } from '../../hooks';


interface IProps {
  id?: string;
  onConfirmed(category: Category): void;
}

const RootCategoryFormContainer: React.FC<IProps> = ({ id, onConfirmed }) => {
  const { user } = useUser();
  const create = useCategoryCreate();
  const update = useCategoryUpdate();
  const { data: category, isLoading } = useCategorySelectById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<CategoryInsert>({
    defaultValues: { userId: user?.id as string },
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
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  return (
    <Box as="form" bg="white" onSubmit={onSubmit} noValidate>
      <FormActions display={['none', 'flex']} isLoading={isSubmitting || isFormSubmitting} />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <RootCategoryForm {...useFormProps} id={id} />
      </Skeleton>
      <FormActions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { RootCategoryFormContainer };
