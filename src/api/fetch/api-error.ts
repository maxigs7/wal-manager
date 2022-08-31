export class ApiError extends Error {
  public body: unknown;
  public status: number = 0;
  public url: string = '';
  public rawError?: unknown;
  constructor(
    response: {
      body: unknown;
      status: number;
      url: string;
    },
    rawError?: unknown,
  ) {
    super();
    this.body = response.body;
    this.status = response.status;
    this.url = response.url;
    this.rawError = rawError || undefined;
  }
}
