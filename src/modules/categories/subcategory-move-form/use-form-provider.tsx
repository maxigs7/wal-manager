'use client';

import React, { PropsWithChildren } from 'react';

import { FormProvider, useForm, yupResolver } from 'react-hook-form';

import { SubcategoryMoveFormType, subcategoryMoveFormSchema } from '../models/subcategory-move';

type Props = PropsWithChildren & {
  id: string;
  parentId: string;
};

const SubcategoryMoveUseFormProvider: React.FC<Props> = ({ children, id, parentId }) => {
  const validationSchema = subcategoryMoveFormSchema;
  const form = useForm<SubcategoryMoveFormType>({
    defaultValues: {
      id,
      parentId,
    },
    mode: 'onBlur',
    resolver: yupResolver<SubcategoryMoveFormType>(validationSchema),
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

export { SubcategoryMoveUseFormProvider };
