export const PARENTS_CATEGORY_ID = 'PARENTS';
export const OTHERS_CATEGORY_ID = 'OTHERS';

export interface ICategoryDataset {
  amount: number;
  children?: ICategoryDataset[];
  color: string;
  id: string;
  label: string;
}
