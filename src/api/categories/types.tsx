import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel, CategoryType } from '../common';

type CategoryBase = {
  isActive: boolean;
  name: string;
};

export type SubCategory = BaseModel & CategoryBase;

export type Category = BaseModel &
  CategoryBase & {
    categoryType: CategoryType;
    color: string;
    icon: IconName;
    subCategories?: SubCategory[];
    userId: string;
  };
