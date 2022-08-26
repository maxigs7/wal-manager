import { useMemo } from 'react';
import { useSearchParams as useReactSearchParams } from 'react-router-dom';

import { parse } from 'query-string';

export const useSearchParams = () => {
  const [searchParams] = useReactSearchParams();

  return useMemo(() => parse(searchParams.toString()), [searchParams]);
};
