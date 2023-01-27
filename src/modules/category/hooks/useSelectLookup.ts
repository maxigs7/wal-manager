import { useMemo } from 'react';

import { IconName } from '@fortawesome/free-solid-svg-icons';
import { UseQueryResult } from '@tanstack/react-query';

import { Category } from '@models';

import { CategoryLookup } from '../models';
import useSelectAll from './useSelectAll';

export type GetCategoryFilters = {
  excludeChildren?: boolean;
  excludeId?: string[];
};

const convertToLookup = (root: Category, sub?: Category): CategoryLookup => ({
  color: root.color as string,
  icon: root.icon as IconName,
  id: sub?.id || root.id,
  rootName: root.name,
  subName: sub?.name,
});

const convertToLookupArray = (categories: Category[]): CategoryLookup[] =>
  categories
    .filter((category) => !category.parentId)
    .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    .reduce((accum: CategoryLookup[], root: Category) => {
      const rootLookup = convertToLookup(root);
      const children = categories
        .filter((category) => category.parentId === root.id)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        .map((sub) => convertToLookup(root, sub));

      return [...accum, rootLookup, ...children];
    }, [] as CategoryLookup[]);

type UseSelectLookupReturn = Omit<UseQueryResult<Category[]>, 'data'> & { data?: CategoryLookup[] };

const useSelectLookup = (filters: GetCategoryFilters = {}): UseSelectLookupReturn => {
  const { data, ...query } = useSelectAll();

  const dataMapped = useMemo(() => {
    if (!data) return data;

    let filteredData = convertToLookupArray(data);
    if (filters.excludeId) {
      filteredData = filteredData.filter((c) => !filters.excludeId?.includes(c.id));
    }

    if (filters.excludeChildren) {
      filteredData = filteredData.filter((c) => !c.subName);
    }

    return filteredData;
  }, [data, filters.excludeChildren, filters.excludeId]);

  return { ...query, data: dataMapped };
};

export default useSelectLookup;
