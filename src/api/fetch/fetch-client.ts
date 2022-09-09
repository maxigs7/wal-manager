import { ApiError } from './api-error';

export interface IFetchClient {
  del<T = {}>(url: string): Promise<T | null>;
  get<T = {}>(url: string): Promise<T | null>;
  post<T = {}>(url: string, payload: any): Promise<T | null>;
  put<T = {}>(url: string, payload: any): Promise<T | null>;
}

export class FetchClient implements IFetchClient {
  constructor(private fetchLike: typeof fetch, private baseUrl: string) {}

  del<T = {}>(url: string): Promise<T | null> {
    return this.fecth(url, {
      headers: {
        // TODO: ADD TOKEN
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });
  }

  get<T>(url: string): Promise<T | null> {
    return this.fecth<T>(url, { method: 'GET' });
  }

  post<T = {}>(url: string, payload: any): Promise<T | null> {
    return this.fecth(url, {
      body: payload ? JSON.stringify(payload) : undefined,
      headers: {
        // TODO: ADD TOKEN
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }

  put<T = {}>(url: string, payload: any): Promise<T | null> {
    return this.fecth(url, {
      body: payload ? JSON.stringify(payload) : undefined,
      headers: {
        // TODO: ADD TOKEN
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
  }

  private fecth<T>(url: string, options?: RequestInit): Promise<T | null> {
    return this.fetchLike(`${this.baseUrl}${url}`, options)
      .then(this.checkStatusCode)
      .then((response) => this.success<T>(response), this.fail);
  }

  private checkStatusCode(response: Response | void): Promise<Response> {
    if (response && response.ok) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  }

  private success<T>(response: Response): Promise<T | null> {
    if (this.isBodyJson(response)) {
      return response.json();
    }
    return Promise.resolve(null);
  }

  private async fail(response: Response): Promise<never> {
    if (this.isBodyJson(response)) {
      const body = await response.json();
      throw new ApiError({
        body,
        status: response.status,
        url: response.url,
      });
    }
    throw new ApiError(
      {
        body: response?.body,
        url: response?.url,
        status: response?.status,
      },
      response,
    );
  }

  private isBodyJson(response: Response): boolean {
    try {
      const contentType = response.headers.get('content-type');
      return !!contentType && contentType.includes('application/json');
    } catch (e) {
      return false;
    }
  }
}
