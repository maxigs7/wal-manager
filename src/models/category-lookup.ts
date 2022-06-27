import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel } from '@lib';

export type CategoryLookup = BaseModel & {
  color: string;
  icon: IconName;
  rootName: string;
  subName?: string;
};
