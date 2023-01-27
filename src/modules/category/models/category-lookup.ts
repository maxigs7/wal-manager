import { IconName } from '@fortawesome/fontawesome-svg-core';

export type CategoryLookup = {
  color: string;
  icon: IconName;
  id: string;
  rootName: string;
  subName?: string;
};
