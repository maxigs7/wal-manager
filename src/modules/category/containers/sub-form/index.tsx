import { Box, Skeleton } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUser } from '@m/auth';
import { Category, CategoryType } from '@models';

import { FormActions, SubCategoryForm } from '../../components';
import { useCategoryCreate, useCategoryGetById, useCategoryUpdate } from '../../hooks';

interface IProps {
  id?: string;
  onConfirmed(category: Category): void;
  parentId: string;
  type: CategoryType;
}

const SubCategoryFormContainer: React.FC<IProps> = ({ id, onConfirmed, parentId, type }) => {
  const { user } = useUser();
  const create = useCategoryCreate();
  const update = useCategoryUpdate();
  const { data: category, isLoading } = useCategoryGetById(id);
  const { isLoading: isSubmitting, mutateAsync } = id ? update : create;

  const useFormProps = useForm<Category>({
    defaultValues: { parentId, userId: user?.id as string, type },
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
      <Skeleton isLoaded={!isLoading || !id} maxW="md" p="5">
        <SubCategoryForm {...useFormProps} id={id} parentId={parentId} type={type} />
      </Skeleton>
      <FormActions
        display={['flex', 'none']}
        isLoading={isSubmitting || isFormSubmitting}
        type={type}
      />
    </Box>
  );
};

export { SubCategoryFormContainer };
