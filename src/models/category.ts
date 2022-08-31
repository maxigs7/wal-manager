// import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel } from '@lib';

import { CategoryType } from './category-type';

export type Category = BaseModel & {
  color: string;
  createdAt: Date;
  // TODO: MATCH WITH ICON NAME
  icon: string;
  isActive: boolean;
  name: string;
  parentId?: string;
  type: CategoryType;
  userId: string;
};

export type CategoryMoveForm = BaseModel & {
  parentId: string;
};
