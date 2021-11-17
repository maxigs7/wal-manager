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

export const toTransactionType = (categoryType: CategoryType): TransactionType | undefined => {
  switch (categoryType) {
    case CategoryType.Expense:
      return TransactionType.Expense;
    case CategoryType.Income:
      return TransactionType.Income;
    default:
      return undefined;
  }
};
