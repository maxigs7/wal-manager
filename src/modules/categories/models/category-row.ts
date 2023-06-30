export type CategoryRow = {
  color?: string;
  icon?: string;
  id: string;
  name: string;
  parentId?: string;
  subRows: CategoryRow[];
  userId: string;
};
