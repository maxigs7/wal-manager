import { useMemo } from 'react';

import { UseQueryResult } from '@tanstack/react-query';

import { Category } from '@/models';

import { CategoryRow } from '../models';
import { convertToRowArray } from '../models/converter';
import useSelectAll from './useSelectAll';

type UseSelectRowReturn = Omit<UseQueryResult<Category[]>, 'data'> & { data?: CategoryRow[] };

const useSelectRow = (initialData?: Category[]): UseSelectRowReturn => {
  const { data, ...query } = useSelectAll(initialData);

  const dataMapped = useMemo(() => {
    if (!data) return data;

    return convertToRowArray(data);
  }, [data]);

  return { ...query, data: dataMapped };
};

export default useSelectRow;
