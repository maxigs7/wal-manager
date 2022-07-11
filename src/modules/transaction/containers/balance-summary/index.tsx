import React from 'react';

import { SimpleGrid, SimpleGridProps, useColorModeValue } from '@chakra-ui/react';

import { TransactionType } from '@models';
import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance } from '../../hooks';
import { useTransactionStore } from '../../providers';

const Summary: React.FC<SimpleGridProps> = ({ ...simpleGridProps }) => {
  const [{ accountId, startDate, endDate, highlightType }, { onHighlightType }] =
    useTransactionStore();
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(
    accountId,
    startDate,
    endDate,
  );

  const bgIconCurrent = useColorModeValue('orange.600', 'orange.200');
  const colorIconCurrent = useColorModeValue('white', 'gray.800');
  const bgIconIncomes = useColorModeValue('green.600', 'green.200');
  const colorIconIncomes = useColorModeValue('white', 'gray.800');
  const bgIconExpenses = useColorModeValue('red.600', 'red.200');
  const colorIconExpenses = useColorModeValue('white', 'gray.800');
  const bgIconBalance = useColorModeValue('blue.600', 'blue.200');
  const colorIconBalance = useColorModeValue('white', 'gray.800');

  const bgCardIncomes = useColorModeValue('green.200', 'green.800');
  const bgCardExpenses = useColorModeValue('red.200', 'red.800');

  const toggleHightlight = (type: TransactionType) => {
    if (highlightType === type) {
      onHighlightType();
      return;
    }
    onHighlightType(type);
  };

  if (!accountId) {
    return null;
  }
  if (isLoadingBalance) return <ContentLoader />;
  if (!balances) {
    return null;
  }

  return (
    <SimpleGrid columns={[1, null, 2, 4]} gap={3} {...simpleGridProps}>
      <StatMoney
        amount={balances.current}
        icon="bank"
        iconProps={{ bg: bgIconCurrent, color: colorIconCurrent }}
        label="Anterior"
        useColors={true}
      />
      <StatMoney
        amount={balances.incomes}
        cursor="pointer"
        icon="sack-dollar"
        iconProps={{ bg: bgIconIncomes, color: colorIconIncomes }}
        label="Ingresos"
        onClick={() => toggleHightlight('incomes')}
        {...(highlightType === 'incomes' ? { bg: bgCardIncomes } : {})}
      />
      <StatMoney
        amount={balances.expenses}
        cursor="pointer"
        icon="sack-xmark"
        iconProps={{ bg: bgIconExpenses, color: colorIconExpenses }}
        label="Gastos"
        onClick={() => toggleHightlight('expenses')}
        {...(highlightType === 'expenses' ? { bg: bgCardExpenses } : {})}
      />
      <StatMoney
        amount={balances.balance}
        icon="balance-scale"
        iconProps={{ bg: bgIconBalance, color: colorIconBalance }}
        label="Balance"
        useColors={true}
      />
    </SimpleGrid>
  );
};

export default React.memo(Summary);
