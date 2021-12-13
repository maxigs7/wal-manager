import { IconName } from '@fortawesome/fontawesome-svg-core';

import { BaseModel } from '@shared';

export type CategoryLookup = BaseModel & {
  color: string;
  icon: IconName;
  rootName: string;
  subName?: string;
};
