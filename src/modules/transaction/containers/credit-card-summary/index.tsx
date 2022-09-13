import { Flex } from '@chakra-ui/react';

import { CreditCardStat } from '@m/creditCard';

import { useCreditCardSummary } from '../../hooks';
import { useTransactionStore } from '../../providers';

const CreditCardSummaryStats: React.FC = () => {
  const [{ account, startDate, endDate }] = useTransactionStore();

  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    account?.id,
    startDate,
    endDate,
  );

  if (!account) {
    return null;
  }

  if (!creditCards || !creditCards.length) {
    return null;
  }
  return (
    <Flex bg="white" overflowX="auto">
      {creditCards.map((cc) => (
        <CreditCardStat key={cc.cc} amount={cc.amount} label={cc.cc} type={cc.type} w="full" />
      ))}
    </Flex>
  );
};
export { CreditCardSummaryStats };
