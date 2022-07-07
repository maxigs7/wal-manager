import { useQuery, UseQueryResult } from 'react-query';

import { useApi } from '@api';
import { TransactionDto, TransactionType } from '@models';

import { TRANSACTIONS_KEY } from '../constants';

interface GetTransactionFilter {
  categories?: string[];
  creditCards?: string[];
  isPaid?: boolean;
  type?: TransactionType;
}

const hook = (
  accountId?: string,
  startDate?: Date,
  endDate?: Date,
  filters: GetTransactionFilter = {},
): UseQueryResult<TransactionDto[]> => {
  const { transactions } = useApi();
  return useQuery(
    [TRANSACTIONS_KEY, accountId, startDate, endDate],
    () => transactions.getTransactions(accountId as string, startDate as Date, endDate as Date),
    {
      enabled: !!startDate && !!endDate && !!accountId,
      select: (data: TransactionDto[]) => {
        const { categories = [], creditCards = [], isPaid, type } = filters;
        let filteredData = data;
        if (categories.length) {
          filteredData = filteredData.filter(
            (t) =>
              categories.includes(t.rootCategoryId) ||
              (t.subCategoryId && categories.includes(t.subCategoryId)),
          );
        }
        if (creditCards.length) {
          filteredData = filteredData.filter(
            (t) => t.creditCardId && creditCards.includes(t.creditCardId),
          );
        }
        if (typeof isPaid !== 'undefined') {
          filteredData = filteredData.filter((t) => t.isPaid === isPaid);
        }
        if (typeof type !== 'undefined') {
          filteredData = filteredData.filter((t) => t.type === type);
        }
        return filteredData;
      },
    },
  );
};

export default hook;
