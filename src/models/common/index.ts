/**************** MODEL TYPES ****************/
export type BaseModel = {
  id: string;
};

/**************** ENUM TYPES ****************/
export enum AccountType {
  Bank = 'bank',
  Wallet = 'wallet',
}

export enum CategoryType {
  Expense = 'expenses',
  Income = 'incomes',
}

export enum CreditCardType {
  amex = 'amex',
  carrefour = 'carrefour',
  mastercard = 'mastercard',
  visa = 'visa',
}

export enum TransactionType {
  Expense = 'expenses',
  Income = 'incomes',
  Transfer = 'transfer',
}

export const toCategoryType = (transactionType: TransactionType): CategoryType => {
  switch (transactionType) {
    case TransactionType.Expense:
      return CategoryType.Expense;
    case TransactionType.Income:
      return CategoryType.Income;
    default:
      return CategoryType.Expense;
  }
};
