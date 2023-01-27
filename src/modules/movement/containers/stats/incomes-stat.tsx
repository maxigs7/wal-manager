import React, { useMemo } from 'react';

import { Stat, useColorModeValue } from '@chakra-ui/react';

import { es } from '@i18n';
import { MovementType } from '@models';
import {
  ContentLoader,
  StatHelpText,
  StatIconContainer,
  StatLabel,
  StatNumberFormatted,
} from '@shared';

import { useMovementSelectSummary } from '../../hooks';
import { useMovementStore } from '../../providers';

const IncomesStat: React.FC = () => {
  const [
    { accountId, highlightType, month, previousMonth, previousYear, quotation, year },
    { onHighlightType },
  ] = useMovementStore();
  const { data: balance, isLoading } = useMovementSelectSummary({
    accountId,
    currentMonth: month,
    currentYear: year,
    previousMonth,
    previousYear,
  });

  const bgCardIncomes = useColorModeValue('green.200', 'green.800');

  const percentage = useMemo(() => {
    const amount = balance?.currentIncomes || 0;
    const previousAmount = balance?.previousIncomes || 0;
    if (!amount || !previousAmount) return 0;

    return (amount / previousAmount - 1) * 100;
  }, [balance]);

  const toggleHightlight = (type: MovementType) => {
    if (highlightType === type) {
      onHighlightType();
      return;
    }
    onHighlightType(type);
  };

  if (isLoading) return <ContentLoader />;
  if (!balance) {
    return null;
  }

  return (
    <StatIconContainer
      cursor="pointer"
      icon="sack-dollar"
      onClick={() => toggleHightlight('incomes')}
      {...(highlightType === 'incomes' ? { bg: bgCardIncomes } : {})}
    >
      <Stat>
        <StatLabel>{es.movement.summary.incomes}</StatLabel>
        <StatNumberFormatted value={balance?.currentIncomes || 0} />
        {!!percentage && <StatHelpText value={percentage} />}
      </Stat>
    </StatIconContainer>
  );
};

export { IncomesStat };
