import { useQuery, UseQueryResult } from 'react-query';

import { IDolarsi, IDolarsiResponse } from './types';
import { parsedLocalStorage, parseResponse, persistData } from './util';

const fetchDolarsi = () => {
  const cachedData = parsedLocalStorage();
  if (cachedData) {
    return new Promise((resolve) => resolve(cachedData));
  }

  return fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales', {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data: IDolarsiResponse[]) => {
      const parsedData = parseResponse(data);
      persistData(parsedData);
      return parsedData;
    });
};

const hook = (): UseQueryResult<IDolarsi[]> => {
  return useQuery('dolarsi', () => fetchDolarsi());
};

export default hook;
