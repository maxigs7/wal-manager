import React, { useMemo } from 'react';

import { Stat, StatHelpText } from '@chakra-ui/react';


import { es } from '@/i18n';
import { formatToCurrency } from '@/lib';
import { ContentLoader, StatIconContainer, StatLabel, StatNumberFormatted } from '@/shared';

import { useMovementSelectSummary } from '../../hooks';
import { useMovementStore } from '../../providers';

const PriorStat: React.FC = () => {
  const [{ accountId, month, previousMonth, previousYear, year }] = useMovementStore();
  const { data: balance, isLoading } = useMovementSelectSummary({
    accountId,
    currentMonth: month,
    currentYear: year,
    previousMonth,
    previousYear,
  });

  if (isLoading) return <ContentLoader />;
  if (!balance) {
    return null;
  }

  return (
    <StatIconContainer icon="bank">
      <Stat>
        <StatLabel>{es.movement.summary.prior}</StatLabel>
        <StatNumberFormatted value={balance?.previousBalance || 0} />
        {balance?.previousBalancePaid !== balance?.previousBalance && (
          <StatHelpText>Pagado: $ {formatToCurrency(balance?.previousBalancePaid)}</StatHelpText>
        )}
      </Stat>
    </StatIconContainer>
  );
};

export { PriorStat };
