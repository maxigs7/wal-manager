import React from 'react';

import { Stack, StackProps, VStack } from '@chakra-ui/react';

import { Card, ContentLoader } from '@shared';

import { AccountBalance, CreditCardSummary } from '../../components';
import { useAccountBalance, useCreditCardSummary } from '../../hooks';

interface IProps extends StackProps {
  accountId: string;
  endDate: Date;
  startDate: Date;
}

const Summary: React.FC<IProps> = ({ accountId, endDate, startDate, ...stackProps }) => {
  const { data: balances, isLoading: isLoadingBalance } = useAccountBalance(
    accountId,
    startDate,
    endDate,
  );
  const { data: creditCards, isLoading: isLoadingCreditCards } = useCreditCardSummary(
    accountId,
    startDate,
    endDate,
  );

  if (!accountId) {
    return null;
  }

  return (
    <Stack {...stackProps}>
      <Card alignItems={isLoadingBalance ? 'center' : 'flex-start'} as={VStack} p="5" w="full">
        {isLoadingBalance && <ContentLoader />}
        {!isLoadingBalance && <AccountBalance balances={balances || []} />}
      </Card>
      <Card alignItems={isLoadingBalance ? 'center' : 'flex-start'} as={VStack} p="5" w="full">
        {isLoadingCreditCards && <ContentLoader />}
        {!isLoadingCreditCards && <CreditCardSummary creditCards={creditCards || []} />}
      </Card>
    </Stack>
  );
};

export default React.memo(Summary);
