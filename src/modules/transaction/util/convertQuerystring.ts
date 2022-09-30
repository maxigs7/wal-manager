import { formatISO } from 'date-fns';
import queryString from 'query-string';

import { TransactionForm } from '@models';

export const convertQuerystring = (transaction: TransactionForm) => {
  const q = {
    accountId: transaction.accountId,
    date: formatISO(transaction.date),
  };
  return queryString.stringify(q);
};
