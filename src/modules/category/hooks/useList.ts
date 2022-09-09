import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useSupabaseClient } from '@api';
import { Category, CategoryLookup, CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

export type GetCategoryFilters = {
  excludeChildren?: boolean;
  excludeId?: string[];
  type?: CategoryType;
};

const convertToCategoryLookup = (root: Category, sub?: Category): CategoryLookup => ({
  color: root.color,
  icon: root.icon,
  id: sub?.id || root.id,
  rootName: root.name,
  subName: sub?.name,
  type: root.type,
});

const convertToCategoryLookupArray = (categories: Category[]): CategoryLookup[] =>
  categories
    .filter((category) => !category.parentId)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    .reduce((accum: CategoryLookup[], root: Category) => {
      const rootLookup = convertToCategoryLookup(root);
      const children = categories
        .filter((category) => category.parentId === root.id)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .map((sub) => convertToCategoryLookup(root, sub));

      return [...accum, rootLookup, ...children];
    }, [] as CategoryLookup[]);

const useList = (filters: GetCategoryFilters = {}): UseQueryResult<CategoryLookup[]> => {
  const { categories } = useSupabaseClient();

  return useQuery(
    [CATEGORIES_KEY, 'lookup'],
    () => categories.getAll().then(convertToCategoryLookupArray),
    {
      select: (data) => {
        let filteredData = data;

        if (filters.type) {
          filteredData = filteredData.filter((c) => c.type === filters.type);
        }

        if (filters.excludeId) {
          filteredData = filteredData.filter((c) => !filters.excludeId?.includes(c.id));
        }

        if (filters.excludeChildren) {
          filteredData = filteredData.filter((c) => !c.subName);
        }

        return filteredData;
      },
    },
  );
};

export default useList;
