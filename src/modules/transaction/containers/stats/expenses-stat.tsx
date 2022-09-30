import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { TransactionType } from '@models';
import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance } from '../../hooks';
import { useTransactionStore } from '../../providers';

const ExpensesStat: React.FC = () => {
  const [{ accountId, startDate, endDate, highlightType, quotation }, { onHighlightType }] =
    useTransactionStore();
  const { data: balances, isLoading } = useAccountBalance(
    accountId,
    startDate,
    endDate,
    quotation?.price,
  );

  const bgIconExpenses = useColorModeValue('red.600', 'red.200');
  const colorIconExpenses = useColorModeValue('white', 'gray.800');
  const bgCardExpenses = useColorModeValue('red.200', 'red.800');

  const toggleHightlight = (type: TransactionType) => {
    if (highlightType === type) {
      onHighlightType();
      return;
    }
    onHighlightType(type);
  };

  if (isLoading) return <ContentLoader />;
  if (!balances) {
    return null;
  }

  return (
    <StatMoney
      amount={balances.expenses}
      cursor="pointer"
      icon="sack-xmark"
      iconProps={{ bg: bgIconExpenses, color: colorIconExpenses }}
      label="Gastos"
      onClick={() => toggleHightlight('expenses')}
      {...(highlightType === 'expenses' ? { bg: bgCardExpenses } : {})}
    />
  );
};

export { ExpensesStat };
