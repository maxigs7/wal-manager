export class SupabaseNotFoundError extends Error {
  constructor(public message: string, public id?: string) {
    super(message);
  }
}
