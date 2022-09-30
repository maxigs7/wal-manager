import { SimpleGrid, SimpleGridProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { ContentLoader, StatMoney } from '@shared';

import { useAccountBalance } from '../../hooks';
import { useTransactionStore } from '../../providers';

const PriorStat: React.FC = () => {
  const [{ accountId, startDate, endDate, quotation }] = useTransactionStore();
  const { data: balances, isLoading } = useAccountBalance(
    accountId,
    startDate,
    endDate,
    quotation?.price,
  );

  const bgIconCurrent = useColorModeValue('orange.600', 'orange.200');
  const colorIconCurrent = useColorModeValue('white', 'gray.800');

  if (isLoading) return <ContentLoader />;
  if (!balances) {
    return null;
  }

  return (
    <StatMoney
      amount={balances.current}
      icon="bank"
      iconProps={{ bg: bgIconCurrent, color: colorIconCurrent }}
      label="Anterior"
      useColors={true}
    />
  );
};

export { PriorStat };
