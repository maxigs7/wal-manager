export interface IModalDispatch<T> {
  onConfirmed(data: T): void;
  onDismiss(): void;
  onOpen(id?: string): void;
}
