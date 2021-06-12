export type BaseModel = {
  id: string;
};

export enum TransactionType {
  Expense = 'expenses',
  Income = 'incomes',
  Transfer = 'transfer',
}

export enum CategoryType {
  Expense = 'expenses',
  Income = 'incomes',
}
