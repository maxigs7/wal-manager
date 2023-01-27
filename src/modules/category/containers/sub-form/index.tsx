import React, { useEffect } from 'react';

import { Box, Skeleton } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { CategoryInsert } from '@models';

import { FormActions, SubCategoryForm } from '../../components';
import { useCategoryCreate, useCategorySelectById, useCategoryUpdate } from '../../hooks';

interface IProps {
  id?: string;
  onConfirmed(category: CategoryInsert): void;
  parentId: string;
}

const SubCategoryFormContainer: React.FC<IProps> = ({ id, onConfirmed, parentId }) => {
  const { user } = useUser();
  const create = useCategoryCreate();
  const update = useCategoryUpdate();
  const { data: category, isLoading } = useCategorySelectById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<CategoryInsert>({
    defaultValues: { parentId, userId: user?.id as string },
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
      <Skeleton isLoaded={!isLoading || !id} maxW="md" p="5">
        <SubCategoryForm {...useFormProps} id={id} parentId={parentId} />
      </Skeleton>
      <FormActions display={['flex', 'none']} isLoading={isSubmitting || isFormSubmitting} />
    </Box>
  );
};

export { SubCategoryFormContainer };
