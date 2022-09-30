import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { TransactionType } from '@models';
import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance } from '../../hooks';
import { useTransactionStore } from '../../providers';

const IncomesStat: React.FC = () => {
  const [{ accountId, startDate, endDate, highlightType, quotation }, { onHighlightType }] =
    useTransactionStore();
  const { data: balances, isLoading } = useAccountBalance(
    accountId,
    startDate,
    endDate,
    quotation?.price,
  );

  const bgIconIncomes = useColorModeValue('green.600', 'green.200');
  const colorIconIncomes = useColorModeValue('white', 'gray.800');
  const bgCardIncomes = useColorModeValue('green.200', 'green.800');

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
      amount={balances.incomes}
      cursor="pointer"
      icon="sack-dollar"
      iconProps={{ bg: bgIconIncomes, color: colorIconIncomes }}
      label="Ingresos"
      onClick={() => toggleHightlight('incomes')}
      {...(highlightType === 'incomes' ? { bg: bgCardIncomes } : {})}
    />
  );
};

export { IncomesStat };
