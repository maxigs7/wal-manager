// import { IconName } from '@fortawesome/fontawesome-svg-core';

import { IconName } from '@fortawesome/free-solid-svg-icons';

import { BaseModel } from '@lib';

import { CategoryType } from './category-type';

export type Category = BaseModel & {
  color: string;
  createdAt: Date;
  icon: IconName;
  isActive: boolean;
  name: string;
  parentId?: string;
  type: CategoryType;
  userId: string;
};

export type CategoryMoveForm = BaseModel & {
  parentId: string;
};
