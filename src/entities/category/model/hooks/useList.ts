import { useQuery, UseQueryResult } from 'react-query';

import { Category, CategoryLookup, CategoryType, useApi } from '@entities';

import { CATEGORIES_KEY } from '../../config/constants';

const convertToCategoryLookup = (root: Category, sub?: Category): CategoryLookup => ({
  rootName: root.name,
  color: root.color,
  icon: root.icon,
  id: sub?.id || root.id,
  subName: sub?.name,
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

const hook = (type?: CategoryType): UseQueryResult<CategoryLookup[]> => {
  const { categories } = useApi();

  const promise = async () => {
    const list = await categories.getAll({
      filtering: (q) => {
        return q.eq('type', type);
      },
    });

    return convertToCategoryLookupArray(list);
  };

  return useQuery(
    [CATEGORIES_KEY, 'lookup', type],
    promise,
    // TODO: Add mapping to lookup
    {
      enabled: !!type,
    },
  );
};

export default hook;
