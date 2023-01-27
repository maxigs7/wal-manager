import React from 'react';

import { Stat } from '@chakra-ui/react';

import { es } from '@/i18n';
import { ContentLoader, StatIconContainer, StatLabel, StatNumberFormatted } from '@/shared';

import { useMovementSelectSummary } from '../../hooks';
import { useMovementStore } from '../../providers';


const InvestmentStat: React.FC = () => {
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
    <StatIconContainer icon="chart-line">
      <Stat>
        <StatLabel>{es.movement.summary.investment}</StatLabel>
        <StatNumberFormatted value={Math.abs(balance.currentInvestment || 0)} />
      </Stat>
    </StatIconContainer>
  );
};

export { InvestmentStat };
