import { CreditCardStat } from '@m/credit-card';
import React from 'react';

import { ContentLoader } from '@shared';

import { useCreditCardSummary } from '../../hooks';
import { useTransactionStore } from '../../providers';

const Summary: React.FC = () => {
  const [{ account, startDate, endDate }] = useTransactionStore();

  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    account?.id,
    startDate,
    endDate,
  );

  if (!account) {
    return null;
  }
  if (isLoadingCreditCards) return <ContentLoader />;
  if (!creditCards || !creditCards.length) {
    return null;
  }

  return (
    <>
      {creditCards.map((cc) => (
        <CreditCardStat key={cc.cc} amount={cc.amount} label={cc.cc} type={cc.type} w="full" />
      ))}
    </>
  );
};

export default React.memo(Summary);
