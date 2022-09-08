import { Box, Skeleton } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { Category, CategoryType } from '@models';

import { FormActions, RootCategoryForm } from '../../components';
import { useCategoryCreate, useCategoryGetById, useCategoryUpdate } from '../../hooks';

interface IProps {
  id?: string;
  onConfirmed(category: Category): void;
  type: CategoryType;
}

const RootCategoryFormContainer: React.FC<IProps> = ({ id, onConfirmed, type }) => {
  const { user } = useUser();
  const create = useCategoryCreate();
  const update = useCategoryUpdate();
  const { data: category, isLoading } = useCategoryGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Category>({
    defaultValues: { userId: user?.id as string, type },
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
    <Box as="form" bg="white" onSubmit={onSubmit}>
      <FormActions
        display={['none', 'flex']}
        isLoading={isSubmitting || isFormSubmitting}
        type={type}
      />
      <Skeleton isLoaded={!isLoading || !id} p="5">
        <RootCategoryForm {...useFormProps} id={id} type={type} />
      </Skeleton>
      <FormActions
        display={['flex', 'none']}
        isLoading={isSubmitting || isFormSubmitting}
        type={type}
      />
    </Box>
  );
};

export { RootCategoryFormContainer };
