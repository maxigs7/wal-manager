import { Flex, StatGroup } from '@chakra-ui/react';

import { CreditCardStat } from '@m/creditCard';

import { useCreditCardSummary } from '../../hooks';
import { useMovementStore } from '../../providers';

const CreditCardSummaryStats: React.FC = () => {
  const [{ accountId, month, year }] = useMovementStore();

  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    accountId,
    month,
    year,
  );

  if (!creditCards || !creditCards.length) {
    return null;
  }
  return (
    <StatGroup bg="white" flexWrap="nowrap" justifyContent="flex-start" overflowX="auto">
      {creditCards.map((cc) => (
        <CreditCardStat key={cc.cc} amount={cc.amount} label={cc.cc} type={cc.type} />
      ))}
    </StatGroup>
  );
};
export { CreditCardSummaryStats };
