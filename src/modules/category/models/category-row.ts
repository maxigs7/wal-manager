import { IconName } from '@fortawesome/free-solid-svg-icons';

export type CategoryRow = {
  color?: string;
  icon?: IconName;
  id: string;
  name: string;
  parentId?: string;
  subRows: CategoryRow[];
};
