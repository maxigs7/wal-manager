import { IconName } from '@fortawesome/fontawesome-common-types';

import { MovementType } from '@models';

export type CategoryTotalItem = {
  amount: number;
  rootCategory: string;
  rootCategoryColor: string;
  rootCategoryIcon: IconName;
  rootCategoryId: string;
  subCategory?: string;
  subCategoryId?: string;
  total: number;
  type: MovementType;
};
