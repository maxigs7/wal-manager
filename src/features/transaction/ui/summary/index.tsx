import React from 'react';

import { VStack, StackProps } from '@chakra-ui/react';

import {
  AccountBalance,
  CreditCardSummary,
  useAccountBalance,
  useCreditCardSummary,
} from '@entities';
import { Card, ContentLoader } from '@shared';

interface IProps extends StackProps {
  endDate: Date;
  startDate: Date;
}

const Summary: React.FC<IProps> = ({ endDate, startDate, ...stackProps }) => {
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(startDate, endDate);
  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    startDate,
    endDate,
  );

  return (
    <VStack {...stackProps}>
      <Card alignItems={isLoadingBalance ? 'center' : 'flex-start'} as={VStack} p="5" w="full">
        {isLoadingBalance && <ContentLoader />}
        {!isLoadingBalance && <AccountBalance balances={balances || []} />}
      </Card>
      <Card alignItems={isLoadingBalance ? 'center' : 'flex-start'} as={VStack} p="5" w="full">
        {isLoadingCreditCards && <ContentLoader />}
        {!isLoadingCreditCards && <CreditCardSummary creditCards={creditCards || []} />}
      </Card>
    </VStack>
  );
};

export default Summary;
