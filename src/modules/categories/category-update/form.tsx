'use client';

import React, { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import { Category } from '@/models';

import { CategoryForm } from '../category-form';
import { CategoryFormType } from '../models/category';

type Props = {
  category: Category;
};

const CategoryFormContainer: React.FC<Props> = ({ category }) => {
  const { reset } = useFormContext<CategoryFormType>();

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  return <CategoryForm />;
};

export { CategoryFormContainer };
