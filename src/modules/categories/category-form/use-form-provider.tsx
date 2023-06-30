'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { CategoryFormType, categoryFormSchema } from '../models/category';
import { useCategoryNameIsUnique } from '../query';

type Props = PropsWithChildren & { categoryId?: string; userId?: string };

const CategoryUseFormProvider: React.FC<Props> = ({ categoryId, children, userId }) => {
  const isUnique = useCategoryNameIsUnique();
  const validationSchema = categoryFormSchema(isUnique, categoryId);
  const form = useForm<CategoryFormType>({
    defaultValues: {
      userId,
    },
    mode: 'onBlur',
    resolver: yupResolver<CategoryFormType>(validationSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { CategoryUseFormProvider };
