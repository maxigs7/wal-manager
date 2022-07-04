import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel } from '@lib';

export type CategoryLookup = BaseModel & {
  color: string;
  icon: IconName;
  rootName: string;
  subName?: string;
};

export type CategoryRow = BaseModel & {
  color: string;
  icon: IconName;
  name: string;
  parentId?: string;
  subRows: CategoryRow[];
};
