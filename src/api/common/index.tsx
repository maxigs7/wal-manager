export type BaseModel = {
  id: string;
};

export enum TransactionType {
  Expense = 'expenses',
  Income = 'incomes',
  Transfer = 'transfer',
}
