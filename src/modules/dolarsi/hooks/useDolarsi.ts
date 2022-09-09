import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { IDolarsi, useDolarsiClient } from '@api';

const useDolarsi = (): UseQueryResult<IDolarsi[]> => {
  const client = useDolarsiClient();
  return useQuery(['dolarsi'], () => client.fetch(), {
    enabled: true,
  });
};

export { useDolarsi };
