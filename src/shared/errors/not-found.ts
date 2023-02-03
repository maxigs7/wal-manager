export class NotFoundError extends Error {
  constructor(public message: string, public id: string) {
    super(message);
  }
}
