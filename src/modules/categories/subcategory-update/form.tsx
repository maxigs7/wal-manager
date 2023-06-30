'use client';

import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Category } from '@/models';

import { SubcategoryFormType } from '../models/subcategory';
import { SubcategoryForm } from '../subcategory-form';

type Props = {
  subcategory: Category;
};

const SubcategoryFormContainer: React.FC<Props> = ({ subcategory }) => {
  const { reset } = useFormContext<SubcategoryFormType>();

  useEffect(() => {
    if (subcategory) {
      reset(subcategory);
    }
  }, [subcategory, reset]);

  return <SubcategoryForm />;
};

export { SubcategoryFormContainer };
