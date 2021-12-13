const types = new Map([
  ['ACCOUNT', 'account'],
  ['CATEGORY', 'category'],
  ['CREDIT_CARD', 'credit_card'],
  ['TRANSACTION', 'transaction'],
]);

export const getTableName = (key: string): string => {
  if (types.has(key)) return types.get(key) as string;
  throw new Error('WRONG KEY');
};
