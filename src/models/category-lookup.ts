import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel } from '@lib';

import { CategoryType } from './category-type';

export type CategoryLookup = BaseModel & {
  color: string;
  icon: IconName;
  rootName: string;
  subName?: string;
  type: CategoryType;
};

export type CategoryRow = BaseModel & {
  color: string;
  icon: IconName;
  name: string;
  parentId?: string;
  subRows: CategoryRow[];
};
