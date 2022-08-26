export type AccountType = 'bank' | 'cash';
export const DEFAULT_ACCOUNT_TYPE: AccountType = 'bank';
export const getAccountTypeName = (type: AccountType): string => {
  switch (type) {
    case 'bank':
      return 'Banco';
    case 'cash':
      return 'Efectivo';
    default:
      return '';
  }
};
