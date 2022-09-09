import { FetchClient } from '../fetch/fetch-client';
import { IDolarsi, IDolarsiResponse } from './types';
import { parsedLocalStorage, parseResponse, persistData } from './util';

export interface IDolarsiClient {
  fetch(): Promise<IDolarsi[]>;
}

const DOLARSI_URL = 'https://www.dolarsi.com';

export class DolarsiClient implements IDolarsiClient {
  private fetchClient: FetchClient;

  constructor(private fetchLike: typeof fetch) {
    this.fetchClient = new FetchClient(this.fetchLike, DOLARSI_URL);
  }

  fetch = (): Promise<IDolarsi[]> => {
    const cachedData = parsedLocalStorage();
    if (cachedData) {
      return new Promise((resolve) => resolve(cachedData));
    }

    return this.fetchClient
      .get<IDolarsiResponse[]>('/api/api.php?type=valoresprincipales')
      .then((data: any) => {
        const parsedData = parseResponse(data as IDolarsiResponse[]);
        persistData(parsedData);
        return parsedData;
      });
  };
}
