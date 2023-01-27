import React, { useMemo } from 'react';

import { Stat, StatHelpText } from '@chakra-ui/react';

import { es } from '@i18n';
import { formatToCurrency } from '@lib';
import { ContentLoader, StatIconContainer, StatLabel, StatNumberFormatted } from '@shared';

import { useMovementSelectSummary } from '../../hooks';
import { useMovementStore } from '../../providers';

const BalanceStat: React.FC = () => {
  const [{ accountId, month, previousMonth, previousYear, quotation, year }] = useMovementStore();
  const { data: balance, isLoading: isLoadingBalance } = useMovementSelectSummary({
    accountId,
    currentMonth: month,
    currentYear: year,
    previousMonth,
    previousYear,
  });

  const balancePaidAmount = useMemo(() => {
    return (balance?.currentBalancePaid || 0) + (balance?.previousBalancePaid || 0);
  }, [balance]);
  const balanceAmount = useMemo(() => {
    return (balance?.currentBalance || 0) + (balance?.previousBalance || 0);
  }, [balance]);

  if (isLoadingBalance) return <ContentLoader />;
  if (!balance) {
    return null;
  }

  return (
    <StatIconContainer icon="balance-scale">
      <Stat>
        <StatLabel>{es.movement.summary.balance}</StatLabel>
        <StatNumberFormatted value={balanceAmount} />
        {balancePaidAmount !== balanceAmount && (
          <StatHelpText>Pagado: $ {formatToCurrency(balancePaidAmount)}</StatHelpText>
        )}
      </Stat>
    </StatIconContainer>
  );
};

export { BalanceStat };
