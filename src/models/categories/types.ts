import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel, CategoryType } from '../common';

export type Category = BaseModel & {
  color: string;
  createdDate: Date;
  icon: IconName;
  isActive: boolean;
  name: string;
  parentId?: string;
  type: CategoryType;
  userId: string;
};

export type CategoryLookup = BaseModel & {
  color: string;
  icon: IconName;
  rootName: string;
  subName?: string;
};
