import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category, CategoryRow, CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

const convertToCategoryRow = (cat: Category): CategoryRow => ({
  name: cat.name,
  color: cat.color,
  icon: cat.icon,
  id: cat.id,
  parentId: cat.parentId,
  subRows: [],
});

const convertToCategoryRowArray = (categories: Category[]): CategoryRow[] =>
  categories
    .filter((category) => !category.parentId)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    .map((root: Category) => {
      const subRows = categories
        .filter((sub) => sub.parentId === root.id)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .map((sub) => convertToCategoryRow(sub));

      return {
        ...convertToCategoryRow(root),
        subRows,
      };
    }, [] as CategoryRow[]);

const hook = (type?: CategoryType): UseQueryResult<CategoryRow[]> => {
  const { categories } = useApi();

  const promise = async () => {
    const list = await categories.getAll({
      filtering: (q) => {
        return q.eq('type', type);
      },
    });

    return convertToCategoryRowArray(list);
  };

  return useQuery(
    [CATEGORIES_KEY, 'rows', type],
    promise,
    // TODO: Add mapping to lookup
    {
      enabled: !!type,
    },
  );
};

export default hook;
