import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel, CategoryType } from '../common';

export type Category = BaseModel & {
  categoryType: CategoryType;
  color: string;
  icon: IconName;
  isActive: boolean;
  name: string;
  parentId: string | null;
  userId: string;
};
