import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useUow } from '@api';
import { Quotation } from '@models';

import { QUOTATION_KEY } from '../constants';

const useSelectAll = (): UseQueryResult<Quotation[]> => {
  const { quotation } = useUow();
  return useQuery([QUOTATION_KEY], () =>
    quotation.select({ order: { field: 'name', ascending: true } }),
  );
};

export default useSelectAll;
