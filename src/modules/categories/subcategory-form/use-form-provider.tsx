'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { SubcategoryFormType, subcategoryFormSchema } from '../models/subcategory';
import { useCategoryNameIsUnique } from '../query';

type Props = PropsWithChildren & { parentId: string; categoryId?: string; userId?: string };

const SubcategoryUseFormProvider: React.FC<Props> = ({
  categoryId,
  children,
  parentId,
  userId,
}) => {
  const isUnique = useCategoryNameIsUnique();
  const validationSchema = subcategoryFormSchema(isUnique, parentId, categoryId);
  const form = useForm<SubcategoryFormType>({
    defaultValues: {
      parentId,
      userId,
    },
    mode: 'onBlur',
    resolver: yupResolver<SubcategoryFormType>(validationSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { SubcategoryUseFormProvider };
