import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { Category, CategoryLookup, CategoryType } from '@models';

import { CATEGORIES_KEY } from '../constants';

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

const hook = (type?: CategoryType, force = false): UseQueryResult<CategoryLookup[]> => {
  const { categories } = useApi();

  const promise = async () => {
    const list = await categories.getAll({
      filtering: (q) => {
        if (!type) return q;
        return q.eq('type', type);
      },
    });

    return convertToCategoryLookupArray(list);
  };

  return useQuery(
    [CATEGORIES_KEY, 'lookup', { force, type }],
    promise,
    // TODO: Add mapping to lookup
    {
      enabled: !!type || force,
    },
  );
};

export default hook;
