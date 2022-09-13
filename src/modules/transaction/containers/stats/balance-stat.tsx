import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance } from '../../hooks';
import { useTransactionStore } from '../../providers';

const BalanceStat: React.FC = () => {
  const [{ account, startDate, endDate, highlightType, quotation }, { onHighlightType }] =
    useTransactionStore();
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(
    account?.id,
    startDate,
    endDate,
    quotation?.price,
  );

  const bgIconBalance = useColorModeValue('blue.600', 'blue.200');
  const colorIconBalance = useColorModeValue('white', 'gray.800');

  if (!account) {
    return null;
  }
  if (isLoadingBalance) return <ContentLoader />;
  if (!balances) {
    return null;
  }

  return (
    <StatMoney
      amount={balances.balance}
      icon="balance-scale"
      iconProps={{ bg: bgIconBalance, color: colorIconBalance }}
      label="Balance"
      useColors={true}
    />
  );
};

export { BalanceStat };
