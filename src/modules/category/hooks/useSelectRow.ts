import { useMemo } from 'react';

import { IconName } from '@fortawesome/free-solid-svg-icons';
import { UseQueryResult } from '@tanstack/react-query';

import { Category } from '@models';

import { CategoryRow } from '../models';
import useSelectAll from './useSelectAll';

const convertToRow = (cat: Category): CategoryRow => ({
  color: cat.color || undefined,
  icon: (cat.icon as IconName) || undefined,
  id: cat.id,
  name: cat.name,
  parentId: cat.parentId || undefined,
  subRows: [],
});

const convertToRowArray = (categories: Category[]): CategoryRow[] =>
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

type UseSelectRowReturn = Omit<UseQueryResult<Category[]>, 'data'> & { data?: CategoryRow[] };

const useSelectRow = (): UseSelectRowReturn => {
  const { data, ...query } = useSelectAll();

  const dataMapped = useMemo(() => {
    if (!data) return data;

    return convertToRowArray(data);
  }, [data]);

  return { ...query, data: dataMapped };
};

export default useSelectRow;
