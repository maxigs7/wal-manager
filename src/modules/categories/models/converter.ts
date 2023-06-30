import { Category } from '@/models';

import { CategoryRow } from './category-row';

const convertToRow = (cat: Category): CategoryRow => ({
  color: cat.color || undefined,
  icon: cat.icon || undefined,
  id: cat.id,
  name: cat.name,
  parentId: cat.parentId || undefined,
  subRows: [],
  userId: cat.userId,
});

export const convertToRowArray = (categories: Category[]): CategoryRow[] =>
  categories
    .filter((category) => !category.parentId)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    .map((root: Category) => {
      const subRows = categories
        .filter((sub) => sub.parentId === root.id)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .map((sub) => convertToRow(sub));

      return {
        ...convertToRow(root),
        subRows,
      };
    }, [] as CategoryRow[]);
