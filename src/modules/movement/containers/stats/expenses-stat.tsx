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

const ExpensesStat: React.FC = () => {
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

  const bgCardExpenses = useColorModeValue('red.200', 'red.800');

  const percentage = useMemo(() => {
    const amount = balance?.currentExpenses || 0;
    const previousAmount = balance?.previousExpenses || 0;
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
      icon="sack-xmark"
      onClick={() => toggleHightlight('expenses')}
      {...(highlightType === 'expenses' ? { bg: bgCardExpenses } : {})}
    >
      <Stat>
        <StatLabel>{es.movement.summary.expenses}</StatLabel>
        <StatNumberFormatted value={balance?.currentExpenses || 0} />
        {!!percentage && <StatHelpText value={percentage} inverted />}
      </Stat>
    </StatIconContainer>
  );
};

export { ExpensesStat };
