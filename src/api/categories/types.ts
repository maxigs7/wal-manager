import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel, CategoryType } from '../common';

export type Category = BaseModel & {
  isActive: boolean;
  name: string;
  categoryType: CategoryType;
  color: string;
  icon: IconName;
  parentId?: string;
  userId: string;
};
